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
    trained: { id: 'trained', name: 'Trained Skills', type: 'system' },
    untrained: { id: 'untrained', name: 'Untrained Skills', type: 'system' },
    weapon: { id: 'weapon', name: 'Weapons', type: 'system' }
}
