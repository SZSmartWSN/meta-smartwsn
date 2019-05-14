#!/bin/sh

# setup environment for DBUS session bus
if [ -z "$DBUS_SESSION_BUS_ADDRESS" ]; then
    eval `dbus-launch --auto-syntax`
fi

# start process control system(supervisor)
if [ ! -e /var/log/supervisor ]; then
    mkdir -p /var/log/supervisor
fi
/usr/bin/supervisord -c /etc/supervisor/supervisord.conf
