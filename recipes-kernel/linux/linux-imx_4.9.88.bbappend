# Copyright (C) 2019 Shenzhen SmartWSN Technology CO., Ltd.

KERNEL_SRC = "git://github.com/SZSmartWSN/linux-imx.git;protocol=https"
SRCBRANCH = "smartwsn-imx_4.9.88_2.0.0_ga"
SRC_URI = "${KERNEL_SRC};branch=${SRCBRANCH}"
SRCREV = "${AUTOREV}"

LOCALVERSION = "-${SRCBRANCH}"
