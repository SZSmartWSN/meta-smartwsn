DESCRIPTION = "Device service for the Gateway project"
SECTION = "device-service"
LICENSE = "MIT"
LIC_FILES_CHKSUM = "file://${COMMON_LICENSE_DIR}/MIT;md5=0835ade698e0bcf8506ecda2f7b4f302"
PR = "r0"

SRC_URI = " \
    file://usr/bin/device-service \
    file://etc/supervisor/conf.d/device-service.conf \
    "

DEPENDS += " \
    glib-2.0 \
    sqlite3 \
    protobuf-c \
    libmodbus \
    libsnap7 \
    "

S = "${WORKDIR}"

do_install() {
    install -d ${D}${bindir}
    install -m 755 ${S}${bindir}/device-service ${D}${bindir}

    install -d ${D}${sysconfdir}/supervisor/conf.d/
    install -m 755 ${S}${sysconfdir}/supervisor/conf.d/device-service.conf ${D}${sysconfdir}/supervisor/conf.d/
}
