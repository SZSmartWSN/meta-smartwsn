# Copyright (C) 2019 Shenzhen SmartWSN Technology CO., Ltd.

UBOOT_SRC = "git://github.com/SZSmartWSN/uboot-imx.git;protocol=https"
SRCBRANCH = "smartwsn-imx_v2017.03_4.9.88_2.0.0_ga"
SRC_URI = "${UBOOT_SRC};branch=${SRCBRANCH}"
SRCREV = "${AUTOREV}"

LOCALVERSION = "-${SRCBRANCH}"
