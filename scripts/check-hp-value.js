export const checkHpValue = _ => {
  if ($('.fhcs-hp-value').val() > 8 + $('.fhcs-level').val() * 3) {
    setTimeout(_ => $('.fhcs-hp-value').val(8 + $('.fhcs-level').val() * 3), 9);
  }
}
