#!/bin/sh

if test -e /home/root/*.mbt
then
	echo "find /home/root/*.mbt"
	if test -d /home/root/upgradefiles/
	then
		echo "find /home/root/upgradefiles/"
		echo "rm -r /home/root/upgradefiles/"
		rm -r /home/root/upgradefiles/
	fi
	echo "rm /home/root/*.mbt"
	rm /home/root/*.mbt
else
	if test -d /home/root/upgradefiles/
	then
		if test -e /home/root/upgradefiles/upgrade.sh
		then
			echo "find /home/root/upgradefiles/upgrade.sh"
			echo "execute /home/root/upgradefiles/upgrade.sh"
			chmod +x /home/root/upgradefiles/upgrade.sh
			/home/root/upgradefiles/upgrade.sh
		fi
		echo "rm -rf /home/root/upgradefiles"
		rm -rf /home/root/upgradefiles
	fi
fi

