DESCRIPTION = "Factory service for the Gateway project"
SECTION = "factory-service"
LICENSE = "MIT"
LIC_FILES_CHKSUM = "file://${COMMON_LICENSE_DIR}/MIT;md5=0835ade698e0bcf8506ecda2f7b4f302"
PR = "r0"

SRC_URI = " \
    file://usr/bin/factory-service \
    "

S = "${WORKDIR}"

DEPENDS += "glib-2.0  \
            protobuf-c \
            curl   \
            paho-mqtt-c"

do_install() {
    install -d ${D}${bindir}
    install -m 755 ${S}${bindir}/factory-service ${D}${bindir}
}
