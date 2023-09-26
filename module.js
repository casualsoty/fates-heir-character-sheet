/*  IMPORTS
 */

import { checkHpValue } from './scripts/check-hp-value.js';
import { FatesHeirCharacterSheet } from './scripts/fates-heir-character-sheet.js';

/*  MAIN
 */

Hooks.on('renderActorSheet', (app, html, data) => {
  $('.fhcs-character-level').on('focusout', _ => {
    checkHpValue();
    data.actor.setFlag('fates-heir-character-sheet', 'level', $('.fhcs-character-level').val());
  });

  $('.fhcs-player-name').on('focusout', _ => data.actor.setFlag('fates-heir-character-sheet', 'player-name', $('.fhcs-player-name').val()));

  $('.fhcs-character-hp-value').on('focusout', _ => checkHpValue());
});

Hooks.once('init', _ => {
  Actors.registerSheet('dnd5e', FatesHeirCharacterSheet, {
    makeDefault: true,
    types: ["character"]
  });

  Handlebars.registerHelper('getHpMax', (level) => {
    return 8 + level * 3;
  });
});
