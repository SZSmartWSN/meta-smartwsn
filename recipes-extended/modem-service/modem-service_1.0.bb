DESCRIPTION = "Modem service for Gateway project"
SECTION = "modem-service"
LICENSE = "MIT"
LIC_FILES_CHKSUM = "file://${COMMON_LICENSE_DIR}/MIT;md5=0835ade698e0bcf8506ecda2f7b4f302"
PR = "r0"

SRC_URI = "file://usr/bin/modem-service"

S = "${WORKDIR}"

do_install() {
    install -d ${D}${bindir}
    install -m 755 ${S}${bindir}/modem-service ${D}${bindir}

    install -d ${D}${sysconfdir}/supervisor/conf.d/
    install -m 755 ${S}${sysconfdir}/supervisor/conf.d/modem-service.conf ${D}${sysconfdir}/supervisor/conf.d/
}
