DESCRIPTION = "Multi-platform Ethernet communication suite for interfacing natively with Siemens S7 PLCs"
SECTION = "modem-service"
LICENSE = "MIT"
LIC_FILES_CHKSUM = "file://${COMMON_LICENSE_DIR}/MIT;md5=0835ade698e0bcf8506ecda2f7b4f302"
PR = "r0"

SRC_URI = "file://modem-service"

S = "${WORKDIR}"

DEPENDS += "glib-2.0"
do_install() {
    install -d ${D}${bindir}
    install -m 755 ${S}/modem-service ${D}${bindir}
}
