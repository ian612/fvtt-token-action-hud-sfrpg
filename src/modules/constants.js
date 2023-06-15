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
    athletics: 'ath',
    bluff: 'blu',
    computers: 'com',
    culture: 'cul',
    diplomacy: 'dip',
    disguide: 'dis',
    engineering: 'eng',
    intimidation: 'itm',
    lifeScience: 'lsc',
    medicine: 'med',
    mysticism: 'mys',
    perception: 'per',
    physicalScience: 'phs',
    piloting: 'pil',
    profession: 'pro',
    senseMotive: 'sen',
    sleightOfHand: 'sle',
    stealth: 'ste',
    survival: 'sur'
}

// All the potential types of actions go here
export const GROUP = {
    consumable: { id: 'consumable', name: 'Consumables', type: 'system' },
    equipment: { id: 'equipment', name: 'Equipment', type: 'system' },
    shield: { id: 'shield', name: 'Shields', type: 'system' },
    token: { id: 'token', name: 'tokenActionHud.token', type: 'system' },
    weapon: { id: 'weapon', name: 'Weapons', type: 'system' }
}
