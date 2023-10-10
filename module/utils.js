/*  Define a set of template paths to pre-load. Pre-loaded templates are compiled and cached for fast access when
 *  rendering. These paths will also be available as Handlebars partials by using the file name
 *  (e.g. "fates-heir-character-sheet.character-sheet").
 */
export const loadHandlebarsTemplates = _ => {
  loadTemplates({
    'fates-heir-character-sheet.character-sheet':         'modules/fates-heir-character-sheet/templates/actors/character-sheet.hbs',
    'fates-heir-character-sheet.d100-roll-dialog':        'modules/fates-heir-character-sheet/templates/chat/d100-roll-dialog.hbs',
    'fates-heir-character-sheet.spellbook':               'modules/fates-heir-character-sheet/templates/actors/parts/actor-spellbook.hbs',
    'fates-heir-character-sheet.journal':                 'modules/fates-heir-character-sheet/templates/actors/parts/actor-journal.hbs',
    'fates-heir-character-sheet.rest':                    'modules/fates-heir-character-sheet/templates/apps/rest.hbs',
    'fates-heir-character-sheet.initiative-roll-dialog':  'modules/fates-heir-character-sheet/templates/chat/initiative-roll-dialog.hbs',
    'fates-heir-character-sheet.inventory':               'modules/fates-heir-character-sheet/templates/actors/parts/actor-inventory.hbs',
    'fates-heir-character-sheet.skill':                   'modules/fates-heir-character-sheet/templates/actors/parts/actor-skill.hbs',
    'fates-heir-character-sheet.skill-roll-dialog':       'modules/fates-heir-character-sheet/templates/chat/skill-roll-dialog.hbs',
    'fates-heir-character-sheet.power':                   'modules/fates-heir-character-sheet/templates/actors/parts/actor-power.hbs',
    'fates-heir-character-sheet.power-roll-dialog':       'modules/fates-heir-character-sheet/templates/chat/power-roll-dialog.hbs',
    'fates-heir-character-sheet.spell-roll-dialog':       'modules/fates-heir-character-sheet/templates/chat/spell-roll-dialog.hbs'
  });
  
  console.debug('Fate\'s Heir Character Sheet | Handlebars templates loaded');
}

/*  Register custom Handlebars helpers used by Fate's Heir Character Sheet
 */
export const registerHandlebarsHelpers = _ => {
  Handlebars.registerHelper('equals', (a, b) => {
    return a === b;
  });

  Handlebars.registerHelper('getHpMax', flags => {
    return 8 + flags.level * (2 + Object.entries(flags).filter(key => String(key).startsWith('power-name-')).map(power => power[1]).includes('Endurance'));
  });

  console.debug('Fate\'s Heir Character Sheet | Handlebars helpers registered');
}
