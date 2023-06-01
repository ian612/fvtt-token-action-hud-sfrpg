/**
 * Module-based constants
 */
export const MODULE = {
    ID: 'token-action-hud-sfrpg'
}

/**
 * Core module
 */
export const CORE_MODULE = {
    ID: 'token-action-hud-core'
}

/**
 * Core module version required by the system module
 */
export const REQUIRED_CORE_MODULE_VERSION = '1.4'

/**
 * Action icons
 */
export const ACTION_ICON = {
    1: '<span style=\'font-family: "Pathfinder2eActions"; font-size: var(--font-size-20);\'>A</span>',
    2: '<span style=\'font-family: "Pathfinder2eActions"; font-size: var(--font-size-20);\'>D</span>',
    3: '<span style=\'font-family: "Pathfinder2eActions"; font-size: var(--font-size-20);\'>T</span>',
    free: '<span style=\'font-family: "Pathfinder2eActions"; font-size: var(--font-size-20);\'>F</span>',
    reaction: '<span style=\'font-family: "Pathfinder2eActions"; font-size: var(--font-size-20);\'>R</span>',
    passive: '',
    A: '<span style=\'font-family: "Pathfinder2eActions"; font-size: var(--font-size-20);\'>A</span>',
    D: '<span style=\'font-family: "Pathfinder2eActions"; font-size: var(--font-size-20);\'>D</span>',
    T: '<span style=\'font-family: "Pathfinder2eActions"; font-size: var(--font-size-20);\'>T</span>',
    F: '<span style=\'font-family: "Pathfinder2eActions"; font-size: var(--font-size-20);\'>F</span>',
    R: '<span style=\'font-family: "Pathfinder2eActions"; font-size: var(--font-size-20);\'>R</span>'
}

/**
 * Action type
 */
export const ACTION_TYPE = {
    action: 'ITEM.TypeAction',
    attribute: 'tokenActionHud.pf2e.attribute',
    auxAction: 'PF2E.WeaponStrikeLabel',
    condition: 'ITEM.TypeCondition',
    effect: 'ITEM.TypeEffect',
    equipment: 'Equipment',
    familiarAttack: 'PF2E.AttackLabel',
    feat: 'PF2E.Item.Feat.LevelLabel',
    item: 'PF2E.ItemTitle',
    save: 'tokenActionHud.pf2e.save',
    skill: 'PF2E.SkillLabel',
    spell: 'ITEM.TypeSpell',
    strike: 'PF2E.WeaponStrikeLabel',
    toggle: 'tokenActionHud.pf2e.toggle',
    utility: 'tokenActionHud.utility'
}

/**
 * Skill abbreviations
 */
export const SKILL_ABBREVIATION = {
    acrobatics: 'acr',
    arcana: 'arc',
    athletics: 'ath',
    crafting: 'cra',
    deception: 'dec',
    diplomacy: 'dip',
    intimidation: 'itm',
    medicine: 'med',
    nature: 'nat',
    occultism: 'occ',
    performance: 'prf',
    religion: 'rel',
    society: 'soc',
    stealth: 'ste',
    survival: 'sur',
    thievery: 'thi'
}

/**
 * Strike icons
 */
export const STRIKE_ICON = {
    melee: `<img class="alt-usage-icon" src="systems/pf2e/icons/mdi/sword.svg" title="Melee Usage" style="
            border: 0;
            filter: invert(1) drop-shadow(1px 1px 1px rgba(0, 0, 0, 1));
            left: 2px;
            padding-top: 3px;
            position: relative;
            ">`,
    thrown: `<img class="alt-usage-icon" src="systems/pf2e/icons/mdi/thrown.svg" title="Thrown Usage" style="
            border: 0;
            filter: invert(1) drop-shadow(1px 1px 1px rgba(0, 0, 0, 1));
            left: 2px;
            padding-top: 3px;
            position: relative;
            ">`
}

export const STRIKE_USAGE = {
    melee: { name: 'PF2E.WeaponRangeMelee' },
    ranged: { name: 'PF2E.NPCAttackRanged' },
    thrown: { name: 'PF2E.TraitThrown' }
}

// All the potential types of actions go here
export const GROUP = {
    weapons: { id: 'weapons', name: 'Weapons', type: 'system' },
    equipment: { id: 'equipment', name: 'Equipment', type: 'system' },
    consumables: { id: 'consumables', name: 'Consumables', type: 'system' },
    token: { id: 'token', name: 'tokenActionHud.token', type: 'system' }
}
