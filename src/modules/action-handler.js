// System Module Imports
import { ACTION_ICON, ACTION_TYPE } from './constants.js'
import { Utils } from './utils.js'

export let ActionHandler = null

Hooks.once('tokenActionHudCoreApiReady', async (coreModule) => {
    ActionHandler = class ActionHandler extends coreModule.api.ActionHandler {
        // Initialize actor and token variables
        actors = null
        actorId = null
        actorType = null
        tokenId = null

        // Initialize items variable
        items = null

        /**
         * Build System Actions
         * @override
         * @param {array} groupIds
         */
        async buildSystemActions(groupIds) {
        // Set actor and token variables
            this.actors = (!this.actor) ? this._getActors() : [this.actor]
            this.actorType = this.actor?.type

            // Exit if actor is not required type
            const knownActors = [
                "character",
                "drone",
                "hazard",
                "npc2",
                "starship",
                "vehicle",
                "npc"
            ]

            if (this.actorType && !knownActors.includes(this.actorType)) return

            // Set items variable
            if (this.actor) {
                let items = this.actor.items
                items = coreModule.api.Utils.sortItemsByName(items)
                this.items = items
            }

            // Set group variables
            this.groupIds = groupIds

            if (this.actorType === 'character') {
                await this._buildCharacterActions();
            }
            if (this.actorType === 'drone') {
                await this._buildDroneActions();
            }
            if (this.actorType === 'hazard') {
                await this._buildHazardActions();
            }
            if (this.actorType === 'npc2') {
                await this._buildNpc2Actions();
            }
            if (this.actorType === 'starship') {
                await this._buildStarshipActions();
            }
            if (this.actorType === 'vehicle') {
                await this._buildVehicleActions();
            }
            if (this.actorType === 'npc') {
                await this._buildNpcActions();
            }

            if (!this.actor) {
                this._buildMultipleTokenActions();
            }
        }

        /**
         * Build character actions
         * @private
         */
        async _buildCharacterActions() {
            this._buildEquipmentCategory();
            this._buildSkillCategory();
        }

        /**
         * Build character actions
         * @private
         */
        async _buildDroneActions() {
            this._buildEquipmentCategory();
            
        }

        /**
         * Build character actions
         * @private
         */
        async _buildHazardActions() {
            
        }

        /**
         * Build character actions
         * @private
         */
        async _buildNpc2Actions() {
            this._buildEquipmentCategory();
            
        }

        /**
         * Build character actions
         * @private
         */
        async _buildStarshipActions() {
            
        }

        /**
         * Build character actions
         * @private
         */
        async _buildVehicleActions() {
            
        }

        /**
         * Build character actions
         * @private
         */
        async _buildNpcActions() {
            this._buildEquipmentCategory();
            
        }

        /**
         * Build multiple token actions
         * @private
         * @returns {object}
         */
        _buildMultipleTokenActions() {

        }

        /**
         * Build equipment with actions
         */
        _buildEquipmentCategory() {
            const actionType = 'equipment';

            // Exit early if no items exist
            if (this.items.size === 0) return;

            // Filter equipment item types to only those that are relevant
            const equipmentTypes = ['weapon', 'shield', 'consumable'];
            const equipmentItems = new Map([...this.items].filter(item => equipmentTypes.includes(item[1].type)));

            // Create the Map for the equipment
            const equipmentMap = new Map();

            // Build a sub-map for each type of equipment
            for (const [key, value] of equipmentItems) {

                const equipmentType = value.type;

                // Add equipment to a map if appropriate
                if (!equipmentMap.has(equipmentType)) {
                    equipmentMap.set(equipmentType, new Map());
                }
                equipmentMap.get(equipmentType).set(key, value);
            }

            // Loop through inventory subcategory ids and add appropriate actions to each
            for (const [key, value] of equipmentMap) {

                // get the category
                const groupId = key;

                // Map of all stuff in the category
                const equipment = value;

                // Create group data
                const groupData = { id: groupId, type: 'system' };

                // Build actions
                this._addActions(equipment, groupData, actionType);
            }
        }

        /**
         * Build Skills
         */
        _buildSkillCategory() {
            const actionType = 'skill';

            const trainedSkills = new Map(Object.entries(this.actor.system.skills).filter(skill => {
                return skill[1].ranks;
            }));
            const untrainedSkills = new Map(Object.entries(this.actor.system.skills).filter(skill => {
                return (!skill[1].ranks && !skill[1].isTrainedOnly);
            }));

            this._addActions(trainedSkills, { id: 'trained', type: 'system' }, actionType);
            this._addActions(untrainedSkills, { id: 'untrained', type: 'system' }, actionType);

        }

        /**
         * Build actions
         * @private
         * @param {object} items
         * @param {object} groupData
         * @param {string} actionType
         */
        async _addActions (items, groupData, actionType, spellLevel = null) {
            // console.log(items, groupData, actionType, spellLevel)
            // Exit if there are no items
            if (items.size === 0) return;

            // Exit if there is no groupId
            const groupId = (typeof groupData === 'string' ? groupData : groupData?.id);
            if (!groupId) return;

            // Get actions
            const actions = [...items].map(item => this._getAction(actionType, item[1], spellLevel));

            // Add actions to action list
            await this.addActions(actions, groupData);
        }

        /**
         * Build inventory
         * @private
         */
        async _buildInventory () {
        // Exit early if no items exist
            if (this.items.size === 0) return

            const inventoryMap = new Map()

            for (const [key, value] of this.items) {
            // Set variables
                const hasQuantity = value.system?.quantity > 0
                const isEquippedItem = this._isEquippedItem(value)
                const type = value.type

                // Set items into maps
                if (hasQuantity) {
                    if (isEquippedItem) {
                        if (!inventoryMap.has('equipped')) inventoryMap.set('equipped', new Map())
                        inventoryMap.get('equipped').set(key, value)
                    }
                    if (!isEquippedItem) {
                        if (!inventoryMap.has('unequipped')) inventoryMap.set('unequipped', new Map())
                        inventoryMap.get('unequipped').set(key, value)
                    }
                    if (isEquippedItem) {
                        if (type === 'armor' && this.actorType === 'character') {
                            if (!inventoryMap.has('armors')) inventoryMap.set('armors', new Map())
                            inventoryMap.get('armors').set(key, value)
                        }
                        if (type === 'consumable') {
                            if (!inventoryMap.has('consumables')) inventoryMap.set('consumables', new Map())
                            inventoryMap.get('consumables').set(key, value)
                        }
                        if (type === 'backpack') {
                            if (!inventoryMap.has('containers')) inventoryMap.set('containers', new Map())
                            inventoryMap.get('containers').set(key, value)
                        }
                        if (type === 'equipment') {
                            if (!inventoryMap.has('equipment')) inventoryMap.set('equipment', new Map())
                            inventoryMap.get('equipment').set(key, value)
                        }
                        if (type === 'treasure') {
                            if (!inventoryMap.has('treasure')) inventoryMap.set('treasure', new Map())
                            inventoryMap.get('treasure').set(key, value)
                        }
                        if (type === 'weapon') {
                            if (!inventoryMap.has('weapons')) inventoryMap.set('weapons', new Map())
                            inventoryMap.get('weapons').set(key, value)
                        }
                    }
                }
            }

            // Loop through inventory group ids
            for (const [key, value] of inventoryMap) {
                const groupId = key
                const inventory = value

                // Create group data
                const groupData = { id: groupId, type: 'system' }

                // Build actions
                this._addActions(inventory, groupData)
            }

            // Add container contents
            if (inventoryMap.has('containers')) {
                // Create parent group data
                const parentGroupData = { id: 'containers', type: 'system' }

                const containers = inventoryMap.get('containers')

                for (const [key, value] of containers) {
                    const container = value
                    const contents = container.contents

                    // Skip if container has no contents
                    if (!contents.size) continue

                    // Create group data
                    const groupData = {
                        id: key,
                        name: container.name,
                        listName: `Group: ${container.name}`,
                        type: 'system-derived'
                    }

                    // Add group to action list
                    await this.addGroup(groupData, parentGroupData)

                    const contentsMap = new Map(contents.map(content => [content.id, content]))

                    // Add actions to action list
                    this._addActions(contentsMap, groupData)
                }
            }
        }

        /**
         * Get Action
         * 
         * This takes the items that have been identified as needing to be added to the token action HUD and
         * returns the appropriate values for the token action hud core module to process them
         * @private
         * @param {string} actionType
         * @param {object} entity
         * @returns {object}
         */
        _getAction (actionType, entity, spellLevel) {
            console.log(actionType, entity, spellLevel)
            
            // get the id from id or _id, include the spell level if it's a spell
            const id = (actionType === 'spell') ? `${entity.id ?? entity._id}-${spellLevel}` : entity.id ?? entity._id
            
            // get the entity's name
            const name = entity?.name ?? entity?.label
            const actionTypeName = `${coreModule.api.Utils.i18n(ACTION_TYPE[actionType])}: ` ?? ''
            const listName = entity.listName ?? `${actionTypeName}${name}`
            let cssClass = ''
            if (Object.hasOwn(entity, 'disabled')) {
                const active = (!entity.disabled) ? ' active' : ''
                cssClass = `toggle${active}`
            }
            const spellcastingId = entity?.spellcasting?.id
            const encodedId = (actionType === 'spell') ? `${spellcastingId}>${spellLevel}>${entity.id ?? entity._id}` : id
            const encodedValue = [actionType, encodedId].join(this.delimiter)
            const actions = entity.system?.actions
            const actionTypes = ['free', 'reaction', 'passive']
            const actionTypeValue = entity.system?.actionType?.value
            const actionsCost = (actions) ? parseInt((actions || {}).value, 10) : null
            const timeValue = entity.system?.time?.value
            const actionIcon = entity.actionIcon
            const iconType = (actionType === 'spell') ? timeValue : (actionTypes.includes(actionTypeValue)) ? actionTypeValue : actionsCost ?? actionIcon
            const icon1 = this._getActionIcon(iconType)
            const img = coreModule.api.Utils.getImage(entity)
            const info = (actionType === 'spell') ? this._getSpellInfo(entity) : this._getItemInfo(entity)
            const info1 = info?.info1
            const info2 = info?.info2
            const info3 = info?.info3
            const systemSelected = entity?.systemSelected ?? null

            // console.log([id, name, encodedValue, cssClass, img, icon1, info1, info2, info3, listName, systemSelected])
            return {
                id,
                name,
                encodedValue,
                cssClass,
                img,
                icon1,
                info1,
                info2,
                info3,
                listName,
                systemSelected
            }
        }

        /**
         * Get spell info
         * @param {object} spell The spell object
         * @returns {object}     The spell info
         */
        _getSpellInfo (spell) {
            const componentData = this._getComponentsInfo(spell)
            const usesData = this._getUsesData(spell)

            return {
                info1: componentData,
                info2: usesData
            }
        }

        /**
         * Get spell component info
         * @param {object} spell The spell object
         * @returns {string}     The spell components
         */
        _getComponentsInfo (spell) {
            const text = spell.components.value ?? spell.system.components?.value ?? ''
            const title = Object.entries(spell.components)
                .filter(component => component[1] === true)
                .map(component => { return component[0].trim().charAt(0).toUpperCase() + component[0].slice(1) })
                .join(', ')
            return { text, title }
        }

        /**
         * Get uses
         * @param {object} spell The spell
         * @returns {string}     The uses
         */
        _getUsesData (spell) {
            const value = spell?.uses?.value
            const max = spell?.uses?.max
            const text = (value && max >= 0) ? `${value}/${max}` : ''
            return { text }
        }

        /**
         * Get actors
         * @private
         * @returns {object}
         */
        _getActors () {
            const allowedTypes = [
                "character",
                "drone",
                "hazard",
                "npc2",
                "starship",
                "vehicle",
                "npc"
            ]
            const actors = canvas.tokens.controlled.map(token => token.actor)
            if (actors.every(actor => allowedTypes.includes(actor.type))) { return actors }
        }

        /**
         * Is equipped item
         * @private
         * @param {object} item
         * @returns {boolean}
         */
        _isEquippedItem (item) {
            const carryTypes = ['held', 'worn']
            const carryType = item.system.equipped?.carryType

            if (this.showUnequippedItems) return true
            if (carryTypes.includes(carryType) && !item.system.containerId?.value?.length) return true
            return false
        }

        /**
         * Get item info
         * @private
         * @param {object} item
         * @returns {object}
         */
        _getItemInfo (item) {
            const quantityData = this._getQuantityData(item) ?? ''
            return {
                info1: { text: quantityData }
            }
        }

        /**
         * Get quantity
         * @private
         * @param {object} item
         * @returns {string}
         */
        _getQuantityData (item) {
            const quantity = item?.system?.quantity?.value
            return (quantity > 1) ? quantity : ''
        }

        /**
         * Get action icon
         * @param {object} action
         * @returns {string}
         */
        _getActionIcon (action) {
            return ACTION_ICON[action]
        }

        /** @protected */
        _foundrySort (a, b) {
            if (!(a?.sort || b?.sort)) return 0

            return a.sort - b.sort
        }
    }
})
