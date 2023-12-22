/** ****************************************
 * My Login
 *
 * Bootstrap 4 Login Page
 *
 * @author          Muhamad Nauval Azhar
 * @uri             https://nauval.in
 * @copyright       Copyright (c) 2018 Muhamad Nauval Azhar
 * @license         My Login is licensed under the MIT license.
 * @github          https://github.com/nauvalazhar/my-login
 * @version         1.2.0
 *
 * Help me to keep this project alive
 * https://www.buymeacoffee.com/mhdnauvalazhar
 *
 ***************************************** */

// 'use strict';
import $ from 'jquery';

$(() => {
  // By @mhdnauvalazhar on Twitter

  function aa44b2u(i) {
    const $this = $(this);
    const id = `eye-password-${i}`;
    // el = $('#' + id);

    $this.wrap($('<div/>', {
      style: 'position:relative',
      id,
    }));

    $this.css({
      paddingRight: 60,
    });
    $this.after($('<div/>', {
      html: 'Show',
      class: 'btn btn-primary btn-sm',
      id: `passeye-toggle-${i}`,
    }).css({
      position: 'absolute',
      right: 10,
      top: ($this.outerHeight() / 2) - 12,
      padding: '2px 7px',
      fontSize: 12,
      cursor: 'pointer',
    }));

    $this.after($('<input/>', {
      type: 'hidden',
      id: `passeye-${i}`,
    }));

    const invalidFeedback = $this.parent().parent().find('.invalid-feedback');

    if (invalidFeedback.length) {
      $this.after(invalidFeedback.clone());
    }

    function aa452ux() {
      $(`#passeye-${i}`).val($(this).val());
    }

    $this.on('keyup paste', aa452ux);

    function aa22iop() {
      if ($this.hasClass('show')) {
        $this.attr('type', 'password');
        $this.removeClass('show');
        $(this).removeClass('btn-outline-primary');
      } else {
        $this.attr('type', 'text');
        $this.val($(`#passeye-${i}`).val());
        $this.addClass('show');
        $(this).addClass('btn-outline-primary');
      }
    }

    $(`#passeye-toggle-${i}`).on('click', aa22iop);
  }

  $("input[type='password'][data-eye]").each(aa44b2u);

  $(document).on('submit', '.my-login-validation', (x) => {
    let res = true;
    const form = $(x.target);
    if (form[0].checkValidity() === false) {
      res = false;
    }
    form.addClass('was-validated');
    return res;
  });
});
