'use strict';

const $ = require('jquery');
const sh = require('shelljs');

const MOUNT_CMD = 'gksu mount 192.168.77.3:/ALMACEN /home/administrador/ALMACEN';
  const UNMOUNT_CMD = 'gksu umount /home/administrador/ALMACEN';

function isMounted() {
    return (sh.exec('df|grep ALMACEN', {
        silent: true
    }).stdout) ? true : false;
}

function setMounted() {
    $('.b-mount', document).removeClass('unmounted');
    $('.b-mount', document).addClass('mounted');
    $('.b-mount', document).text('UMOUNT ALMACEN');
}

function setUnMounted() {
    $('.b-mount', document).removeClass('mounted');
    $('.b-mount', document).addClass('unmounted');
    $('.b-mount', document).text('MOUNT ALMACEN');
}

function setButtonStatus() {
    if (isMounted()) {
        $('#footer', document).text('ALMACEN IS MOUNTED');
        setMounted();
    } else {
        $('#footer', document).text('ALMACEN IS NOT MOUNTED');
        setUnMounted();
    }
}

$(document).ready(() => {
    //require('nw.gui').Window.get().showDevTools();
    console.log('Init mounter');
    setButtonStatus();

    $('.b-mount', document).on('click', () => {
        if (isMounted()) {
            $('.b-mount', document).text('Unmounting ALMACEN');
            console.log(UNMOUNT_CMD);            
            sh.exec(UNMOUNT_CMD);
        } else {
            $('.b-mount', document).text('Mounting ALMACEN');
            console.log(MOUNT_CMD);
            sh.exec(MOUNT_CMD);
        }
        setButtonStatus();
    });
});
