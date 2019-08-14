DESCRIPTION = "Wi-Fi service for Gateway project"
SECTION = "wifi-service"
LICENSE = "MIT"
LIC_FILES_CHKSUM = "file://${COMMON_LICENSE_DIR}/MIT;md5=0835ade698e0bcf8506ecda2f7b4f302"
PR = "r0"

SRC_URI = " \
    file://usr/bin/wifi-config \
    file://usr/bin/wifi-scan \
    file://usr/bin/wifi-ssid \
    file://usr/bin/wifi-action \
    file://usr/bin/wifi-service \
    file://etc/supervisor/conf.d/wifi-service.conf \
    "

S = "${WORKDIR}"

RDEPENDS_${PN} = "bash \
"

do_install() {
    install -d ${D}${bindir}
    install -m 755 ${S}${bindir}/wifi-config ${D}${bindir}
    install -m 755 ${S}${bindir}/wifi-scan ${D}${bindir}
    install -m 755 ${S}${bindir}/wifi-ssid ${D}${bindir}
    install -m 755 ${S}${bindir}/wifi-action ${D}${bindir}
    install -m 755 ${S}${bindir}/wifi-service ${D}${bindir}

    install -d ${D}${sysconfdir}/supervisor/conf.d/
    install -m 755 ${S}${sysconfdir}/supervisor/conf.d/wifi-service.conf ${D}${sysconfdir}/supervisor/conf.d/
}
