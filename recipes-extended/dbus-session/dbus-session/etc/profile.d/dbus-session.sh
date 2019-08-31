#!/bin/sh

/usr/bin/mbt.sh

# setup environment for DBUS session bus
if [ -z "$DBUS_SESSION_BUS_ADDRESS" ]; then
    eval `dbus-launch --auto-syntax`
fi

if [ ! -e /etc/serial-number ]; then
    /usr/bin/factory-service &
else

# start process control system(supervisor)
if [ ! -e /var/log/supervisor ]; then
    mkdir -p /var/log/supervisor
fi
/usr/bin/supervisord -c /etc/supervisor/supervisord.conf

# start /usr/bin/SetupRouteRule.sh
/usr/bin/SetupRouteRule.sh &

fi
