export const checkHpValue = _ => {
  if ($('.fhcs-character-hp-value').val() > 8 + $('.fhcs-character-level').val() * 3) {
    setTimeout(_ => $('.fhcs-character-hp-value').val(8 + $('.fhcs-character-level').val() * 3), 9);
  }
}
