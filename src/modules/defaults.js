import { GROUP } from './constants.js'

/**
 * Default layout and groups
 */
export let DEFAULTS = null

Hooks.once('tokenActionHudCoreApiReady', async (coreModule) => {
    const groups = GROUP
    console.log(groups);
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
                name: 'Equipment', // coreModule.api.Utils.i18n('PF2E.TabInventoryLabel'),
                groups: [
                    { ...groups.weapons, nestId: 'equipment_weapons' },
                    { ...groups.consumables, nestId: 'equipment_consumables' }
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
