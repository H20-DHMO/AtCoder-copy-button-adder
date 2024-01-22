// ==UserScript==
// @name         AtCoder copy button adder
// @namespace    https://github.com/H20-DHMO
// @version      1.0
// @description  AtCoderの問題文中の文字列にの横にコピーボタンを置きます。
// @author       H20_dhmo
// @license      MIT
// @match        https://atcoder.jp/contests/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // copy button
    function copyButton() {
        window.getSelection().removeAllRanges();
        try {
            const targetId = $(this).data('target');
            const text = $('#' + targetId).text();
            navigator.clipboard.writeText(text).then(() => {
                $(this).tooltip('show');
                $(this).blur();
                setTimeout(() => { $(this).tooltip('hide'); }, 800);
            });
        } catch (err) {
            console.log(err);
        }
        window.getSelection().removeAllRanges();
    }

    // UUIDを生成する関数
    function generateUUID() {
        let dt = new Date().getTime();
        const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            const r = (dt + Math.random()*16)%16 | 0;
            dt = Math.floor(dt/16);
            return (c === 'x' ? r : (r&0x3|0x8)).toString(16);
        });
        return uuid;
    }

    function addCopyButton(element) {
        // コピー用のボタン（span要素）を作成
        const uuid = generateUUID();
        element.setAttribute('id', uuid);

        const copyBtn = $(`<span class="btn btn-default btn-sm btn-copy ml-1" tabindex="0" data-toggle="tooltip" data-trigger="manual" title="Copied!" data-target="${uuid}">Copy</span>`);
        $(element).after(copyBtn);
        copyBtn.click(copyButton);
    }

    // 問題内の<code>要素を取得
    const codes = document.querySelectorAll('#task-statement .part code');
    codes.forEach(function(elm) {
        addCopyButton(elm);
    });

})();
