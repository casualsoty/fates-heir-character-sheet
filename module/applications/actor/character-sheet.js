/*  An Actor sheet for player character type actors.
 */
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

  /*  @inheritDoc ActorSheet5eCharacter
   */
  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      classes: ['actor', 'character', 'dnd5e', 'fhcs', 'sheet'],
      height: 30 + (1305 * 720 / 922),
      width: 720
    });
  }

  /*  @override ActorSheet5eCharacter
   */
  async getData(options={}) {
    const CONTEXT = await super.getData(options);

    return foundry.utils.mergeObject(CONTEXT, {
      powers: {
        alacrity: game.i18n.localize('FHCS.Alacrity'),
        artifice: game.i18n.localize('FHCS.Artifice'),
        beastMastery: game.i18n.localize('FHCS.BeastMastery'),
        command: game.i18n.localize('FHCS.Command'),
        death: game.i18n.localize('FHCS.Death'),
        deception: game.i18n.localize('FHCS.Deception'),
        earth: game.i18n.localize('FHCS.Earth'),
        endurance: game.i18n.localize('FHCS.Endurance'),
        fire: game.i18n.localize('FHCS.Fire'),
        vitality: game.i18n.localize('FHCS.Vitality'),
        knowledge: game.i18n.localize('FHCS.Knowledge'),
        might: game.i18n.localize('FHCS.Might'),
        moon: game.i18n.localize('FHCS.Moon'),
        nature: game.i18n.localize('FHCS.Nature'),
        water: game.i18n.localize('FHCS.Water'),
        air: game.i18n.localize('FHCS.Air'),
        sorcery: game.i18n.localize('FHCS.Sorcery'),
        sun: game.i18n.localize('FHCS.Sun'),
        weaponry: game.i18n.localize('FHCS.Weaponry'),
        time: game.i18n.localize('FHCS.Time')
      }
    });
  }

  /*  @inheritDoc ActorSheet5eCharacter
   */
  activateListeners(html) {
    // power
    for (let i = 1; i < 6; i++) {
      if (this.actor.getFlag('fates-heir-character-sheet', 'power-name-' + i)) {
        html.find('.fhcs-power-name-' + i + '-a').html(this.actor.getFlag('fates-heir-character-sheet', 'power-name-' + i));
        html.find('[name="fhcs-power-name-' + i + '"] option[value="' + this.actor.getFlag('fates-heir-character-sheet', 'power-name-' + i) + '"]').prop('selected', true);
      }
    }

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
          html.find('.fhcs-skill-' + e.target.dataset.skill + '-a').css('display', 'flex');
        }
      });

      html.find('.fhcs-skill-ai').on('click', e => {
        html.find('.fhcs-skill-' + e.target.dataset.skill + '-a').css('display', 'none');
        html.find('.fhcs-skill-' + e.target.dataset.skill + '-input').css('display', 'block').focus();
      });

      // power
      html.find('.fhcs-power-name').click(this._onRollPowerCheck.bind(this));

      html.find('.fhcs-power-ai').on('click', e => {
        html.find('.fhcs-power-name-' + e.target.dataset.power + '-a').css('display', 'none');
        html.find('[name="fhcs-power-name-' + e.target.dataset.power + '"]').css('display', 'block').focus();
      });

      html.find('[name^="fhcs-power-name-"]').on('change focusout', e => {
        html.find('[name="fhcs-power-name-' + e.target.dataset.power + '"]').css('display', 'none');
        this.actor.setFlag('fates-heir-character-sheet', 'power-name-' + e.target.dataset.power, e.target.value);
        html.find('.fhcs-power-name-' + e.target.dataset.power + '-a').html(e.target.value).css('display', 'flex');
      });

      html.find('.fhcs-power-level').on('focusout keypress', e => {
        if (e.type === 'focusout' || e.which === 13) {
          this.actor.setFlag('fates-heir-character-sheet', 'power-level-' + e.target.dataset.power, e.target.value);
        }
      });

      html.find('.fhcs-power-invocation').on('focusout keypress', e => {
        if (e.type === 'focusout' || e.which === 13) {
          this.actor.setFlag('fates-heir-character-sheet', 'power-invocation-' + e.target.dataset.power, e.target.value);
        }
      });
    }

    super.activateListeners(html);
  }

  /*  @override ActorSheet5e
   */
  get template() {
    return 'modules/fates-heir-character-sheet/templates/actors/character-sheet.hbs';
  }

  /*  Handle rolling a Skill check.
   *    @override ActorSheet5e
   *    @param {Event} event  The originating click event.
   *    @private
   */
  async _onRollSkillCheck(e) {
    if (this.actor.isOwner) {
      new Dialog({
        buttons: {
          advantage: {
            label: game.i18n.localize('DND5E.Advantage'),
            callback: html => this.rollSkill(html, '2d100kh', e.target.innerText + ' Skill Check (Advantage)')
          },
          normal: {
            label: game.i18n.localize('DND5E.Normal'),
            callback: html => this.rollSkill(html, '1d100', e.target.innerText + ' Skill Check')
          },
          disadvantage: {
            label: game.i18n.localize('DND5E.Disadvantage'),
            callback: html => this.rollSkill(html, '2d100kl', e.target.innerText + ' Skill Check (Disadvantage)')
          }
        },
        content: await renderTemplate('modules/fates-heir-character-sheet/templates/chat/skill-roll-dialog.hbs', {
          defaultRollMode: game.settings.get('core', 'rollMode'),
          rollModes: CONFIG.Dice.rollModes,
        }),
        title: e.target.innerText + ' Skill Check: ' + this.actor.name
      }).render(true);
    }
  }

  /*  Handle rolling a Power check.
   *    @param {Event} event  The originating click event.
   *    @private
   */
  async _onRollPowerCheck(e) {
    console.log(e.target)
    if (this.actor.isOwner) {
      new Dialog({
        buttons: {
          advantage: {
            label: game.i18n.localize('DND5E.Advantage'),
            callback: html => this.rollPower(html, '2d100kh', e.target.dataset.power, e.target.innerText + ' Power Check (Advantage)')
          },
          normal: {
            label: game.i18n.localize('DND5E.Normal'),
            callback: html => this.rollPower(html, '1d100', e.target.dataset.power, e.target.innerText + ' Power Check')
          },
          disadvantage: {
            label: game.i18n.localize('DND5E.Disadvantage'),
            callback: html => this.rollPower(html, '2d100kl', e.target.dataset.power, e.target.innerText + ' Power Check (Disadvantage)')
          }
        },
        content: await renderTemplate('modules/fates-heir-character-sheet/templates/chat/power-roll-dialog.hbs', {
          defaultRollMode: game.settings.get('core', 'rollMode'),
          rollModes: CONFIG.Dice.rollModes,
        }),
        title: e.target.innerText + ' Power Check: ' + this.actor.name
      }).render(true);
    }
  }

  /*
   */
  checkHpValue = html => {
    if (html.find('.fhcs-hp-value').val() > 8 + html.find('.fhcs-level').val() * 2) {
      html.find('.fhcs-hp-value').val(8 + html.find('.fhcs-level').val() * 2);
    }
  }

  /*
   */
  rollSkill = async (html, command, flavor) => {
    const BONUS = html.find('[name="bonus"]').val() ? ' + ' + html.find('[name="bonus"]').val() : '';
    const ROLL = await new Roll(command + ' + ' + this.actor.getFlag('fates-heir-character-sheet', 'level') + ' * 3' + BONUS).evaluate();

    return ROLL.toMessage({
      flavor: flavor,
      speaker: {
        alias: this.actor.name
      }
    }, {
      rollMode: html.find('[name="rollMode"]').val()
    });
  }

  /*
   */
  rollPower = async (html, command, powerId, flavor) => {
    const BONUS = html.find('[name="bonus"]').val() ? ' + ' + html.find('[name="bonus"]').val() : '';
    const ROLL = await new Roll(command + ' + ' + this.actor.getFlag('fates-heir-character-sheet', 'power-level-' + powerId) + ' * 5' + BONUS).evaluate();

    return ROLL.toMessage({
      flavor: flavor,
      speaker: {
        alias: this.actor.name
      }
    }, {
      rollMode: html.find('[name="rollMode"]').val()
    });
  }
}
