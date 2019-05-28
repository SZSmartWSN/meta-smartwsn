DESCRIPTION = "Localconfig service for the Gateway project"
SECTION = "localconfig-service"
LICENSE = "MIT"
LIC_FILES_CHKSUM = "file://${COMMON_LICENSE_DIR}/MIT;md5=0835ade698e0bcf8506ecda2f7b4f302"
PR = "r0"

SRC_URI = " \
    file://usr/bin/localconfig-service \
    file://etc/boa/boa.conf \
    file://etc/boa/mime.types \
    file://etc/supervisor/conf.d/localconfig-service.conf \
    file://var/www/ \
    "

S = "${WORKDIR}"

DEPENDS += "glib-2.0"

do_install() {
    install -d ${D}${bindir}
    install -m 755 ${S}${bindir}/localconfig-service ${D}${bindir}

    install -d ${D}${sysconfdir}/boa/
    install -m 755 ${S}${sysconfdir}/boa/boa.conf ${D}${sysconfdir}/boa/
    install -m 755 ${S}${sysconfdir}/boa/mime.types ${D}${sysconfdir}/boa/

    install -d ${D}${sysconfdir}/supervisor/conf.d/
    install -m 755 ${S}${sysconfdir}/supervisor/conf.d/localconfig-service.conf ${D}${sysconfdir}/supervisor/conf.d/

    install -d ${D}${localstatedir}/
    cp -r ${S}${localstatedir}/www/ ${D}${localstatedir}/
}
