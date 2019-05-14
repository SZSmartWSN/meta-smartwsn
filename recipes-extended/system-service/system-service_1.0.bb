DESCRIPTION = "System service for the Gateway project"
SECTION = "system-service"
LICENSE = "MIT"
LIC_FILES_CHKSUM = "file://${COMMON_LICENSE_DIR}/MIT;md5=0835ade698e0bcf8506ecda2f7b4f302"
PR = "r0"

SRC_URI = " \
    file://usr/bin/system-service \
    file://etc/supervisor/conf.d/system-service.conf \
    "

S = "${WORKDIR}"

DEPENDS += "glib-2.0"

do_install() {
    install -d ${D}${bindir}
    install -m 755 ${S}${bindir}/system-service ${D}${bindir}

    install -d ${D}${sysconfdir}/supervisor/conf.d/
    install -m 755 ${S}${sysconfdir}/supervisor/conf.d/system-service.conf ${D}${sysconfdir}/supervisor/conf.d/
}
