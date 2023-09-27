export class FatesHeirCharacterSheet extends dnd5e.applications.actor.ActorSheet5eCharacter {
  constructor(...args) {
    super(...args);

    if (!this.actor.getFlag('fates-heir-character-sheet', 'level')) {
      this.actor.setFlag('fates-heir-character-sheet', 'level', 1);
    }
    if (!this.actor.system.attributes.hp.value) {
      this.actor.system.attributes.hp.value = 11;
    }
  }

  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      classes: ['actor', 'character', 'dnd5e', 'fhcs', 'sheet'],
      height: 30 + (1305 * 720 / 922),
      width: 720
    });
  }

  get template() {
    return 'modules/fates-heir-character-sheet/templates/actors/character-sheet.hbs';
  }

  activateListeners(html) {
    if (this.actor.isOwner) {
      // level
      html.find('.fhcs-level').on('focusout keypress', e => {
        if (html.find('.fhcs-level').val() !== this.actor.getFlag('fates-heir-character-sheet', 'level')) {
          if (e.type === 'focusout' || e.which === 13) {
            this.actor.setFlag('fates-heir-character-sheet', 'level', html.find('.fhcs-level').val());
            this.checkHpValue(html);
          }
        }
      });

      // player-name
      html.find('.fhcs-player-name').on('focusout keypress', e => {
        if (e.type === 'focusout' || e.which === 13) {
          this.actor.setFlag('fates-heir-character-sheet', 'player-name', html.find('.fhcs-player-name').val());
        }
      });

      // hp-value
      html.find('.fhcs-hp-value').on('focusout keypress', e => {
        if (e.type === 'focusout' || e.which === 13) {
          this.checkHpValue(html);
        }
        if (e.which === 13) {
          html.find('.fhcs-hp-value').focus();
        }
      });

      // signature-power
      html.find('.fhcs-signature-power').on('focusout', _ => {
        this.actor.setFlag('fates-heir-character-sheet', 'signature-power', html.find('.fhcs-signature-power').val());
      });

      // skill
      html.find('.fhcs-skill-name').click(this._onRollSkillCheck.bind(this));

      html.find('.fhcs-skill-input').on('focusout keypress', e => {
        if (e.type === 'focusout' || e.which === 13) {
          html.find('.fhcs-skill-' + e.target.dataset.skill + '-input').css('display', 'none');
          this.actor.setFlag('fates-heir-character-sheet', 'skill-' + e.target.dataset.skill, html.find('.fhcs-skill-' + e.target.dataset.skill + '-input').val());
          html.find('.fhcs-skill-' + e.target.dataset.skill + '-div').css('display', 'flex');
        }
      });

      html.find('.fhcs-skill-ai').on('click', e => {
        html.find('.fhcs-skill-' + e.target.dataset.skill + '-a').css('display', 'none');
        html.find('.fhcs-skill-' + e.target.dataset.skill + '-input').css('display', 'block').focus();
      });
    }

    super.activateListeners(html);
  }

  checkHpValue = html => {
    if (html.find('.fhcs-hp-value').val() > 8 + html.find('.fhcs-level').val() * 3) {
      html.find('.fhcs-hp-value').val(8 + html.find('.fhcs-level').val() * 3);
    }
  }
}
