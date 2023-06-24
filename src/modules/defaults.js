import { GROUP } from './constants.js'

/**
 * Default layout and groups
 */
export let DEFAULTS = null

Hooks.once('tokenActionHudCoreApiReady', async (coreModule) => {
    const groups = GROUP;
    Object.values(groups).forEach(group => {
        group.name = coreModule.api.Utils.i18n(group.name)
        group.listName = `Group: ${coreModule.api.Utils.i18n(group.name)}`
    })
    const groupsArray = Object.values(groups)
    DEFAULTS = {
        layout: [
            {
                nestId: 'equipment',
                id: 'equipment',
                name: 'Equipment',
                groups: [
                    { ...groups.weapon, nestId: 'equipment_weapon' },
                    { ...groups.shield, nestId: 'equipment_shield' },
                    { ...groups.consumable, nestId: 'equipment_consumable' }
                ]
            },
            {
                nestId: 'skill',
                id: 'skill',
                name: 'Skills',
                groups: [
                    { ...groups.trained, nestId: 'skill_trained' },
                    { ...groups.untrained, nestId: 'skill_untrained' }
                ]
            },
            {
                nestId: 'ability',
                id: 'ability',
                name: 'Abilities',
                groups: [
                    { ...groups.ability, nestId: 'ability_ability' }
                ]
            },
            {
                nestId: 'save',
                id: 'save',
                name: 'Saves',
                groups: [
                    { ...groups.save, nestId: 'save_save' }
                ]
            },
            {
                nestId: 'utility',
                id: 'utility',
                name: coreModule.api.Utils.i18n('tokenActionHud.utility'),
                groups: [
                    { ...groups.token, nestId: 'utility_token' }
                ]
            }
        ],
        groups: groupsArray
    }
})
