DESCRIPTION = "Quarkioe service for the Gateway project"
SECTION = "quarkioe-service"
LICENSE = "MIT"
LIC_FILES_CHKSUM = "file://${COMMON_LICENSE_DIR}/MIT;md5=0835ade698e0bcf8506ecda2f7b4f302"
PR = "r0"

SRC_URI = " \
    file://usr/bin/quarkioe-service \
    file://etc/supervisor/conf.d/quarkioe-service.conf \
    "

S = "${WORKDIR}"

DEPENDS += " \
    glib-2.0 \
    paho-mqtt-c \
    "

# TARGET_CC_ARCH += "${LDFLAGS}"

do_install() {
    install -d ${D}${bindir}
    install -m 755 ${S}${bindir}/quarkioe-service ${D}${bindir}

    install -d ${D}${sysconfdir}/supervisor/conf.d/
    install -m 755 ${S}${sysconfdir}/supervisor/conf.d/quarkioe-service.conf ${D}${sysconfdir}/supervisor/conf.d/
}
