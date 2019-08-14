DESCRIPTION = "FOTA service for Gateway project"
SECTION = "fota-service"
LICENSE = "MIT"
LIC_FILES_CHKSUM = "file://${COMMON_LICENSE_DIR}/MIT;md5=0835ade698e0bcf8506ecda2f7b4f302"
PR = "r0"

SRC_URI = " \
    file://usr/bin/mbt.sh \
    "

S = "${WORKDIR}"

RDEPENDS_${PN} = "bash \
"

do_install() {
    install -d ${D}${bindir}
    install -m 755 ${S}${bindir}/mbt.sh ${D}${bindir}
}
