/*  IMPORTS
 */

import { checkHpValue } from './scripts/check-hp-value.js';
import { FatesHeirCharacterSheet } from './scripts/fates-heir-character-sheet.js';

/*  MAIN
 */

Hooks.on('renderActorSheet', (app, html, data) => {
  // level
  $('.fhcs-level').on('focusout keypress', e => {
    if ($('.fhcs-level').val() !== data.actor.getFlag('fates-heir-character-sheet', 'level')) {
      if (e.type === 'focusout' || e.which === 13) {
        checkHpValue();
        data.actor.setFlag('fates-heir-character-sheet', 'level', $('.fhcs-level').val());
      }
      if (e.which === 13) {
        setTimeout(_ => $('.fhcs-level').focus(), 9);
      }
    }
  });

  // player-name
  $('.fhcs-player-name').on('focusout keypress', e => {
    if (e.type === 'focusout' || e.which === 13) {
      data.actor.setFlag('fates-heir-character-sheet', 'player-name', $('.fhcs-player-name').val());
    }
    if (e.which === 13) {
      setTimeout(_ => $('.fhcs-player-name').focus(), 9);
    }
  });

  // hp-value
  $('.fhcs-hp-value').on('focusout keypress', e => {
    if (e.type === 'focusout' || e.which === 13) {
      checkHpValue();
    }
    if (e.which === 13) {
      setTimeout(_ => $('.fhcs-hp-value').focus(), 9);
    }
  });

  // signature-power
  $('.fhcs-signature-power').on('focusout', _ => {
    data.actor.setFlag('fates-heir-character-sheet', 'signature-power', $('.fhcs-signature-power').val());
  });

  // skill
  $('.fhcs-skill-input').on('focusout keypress', e => {
    if (e.type === 'focusout' || e.which === 13) {
      $('.fhcs-skill-' + e.target.dataset.skill + '-input').css('display', 'none');
      data.actor.setFlag('fates-heir-character-sheet', 'skill-' + e.target.dataset.skill, $('.fhcs-skill-' + e.target.dataset.skill + '-input').val());
      setTimeout(_ => $('.fhcs-skill-' + e.target.dataset.skill + '-div').css('display', 'flex'), 9);
    }
  });

  $('.fhcs-skill-ai').on('click', e => {
    $('.fhcs-skill-' + e.target.dataset.skill + '-div').css('display', 'none');
    $('.fhcs-skill-' + e.target.dataset.skill + '-input').css('display', 'block').focus();
  });
});

Hooks.once('init', _ => {
  Actors.registerSheet('dnd5e', FatesHeirCharacterSheet, {
    makeDefault: true,
    types: ["character"]
  });

  Handlebars.registerHelper('getHpMax', level => {
    return 8 + level * 3;
  });

  loadTemplates({
    'fates-heir-character-sheet.inventory': 'modules/fates-heir-character-sheet/templates/actors/parts/inventory.hbs',
    'fates-heir-character-sheet.skill': 'modules/fates-heir-character-sheet/templates/actors/parts/skill.hbs'
  });
});
