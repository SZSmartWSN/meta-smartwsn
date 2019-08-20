#!/bin/sh

IFACE=$1

IP=`/sbin/ifconfig $IFACE | grep 'inet ' | cut -d: -f2 | awk '{print $1}'`
NETMASK=`/sbin/ifconfig $IFACE | grep 'inet ' | cut -d: -f4 | awk '{print $1}'`
GATEWAY=`/sbin/ip route | grep 'default' | grep $IFACE | awk '{print $3}'`

echo -n "$IP/$NETMASK/$GATEWAY/" 2> /dev/null
