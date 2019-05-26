DESCRIPTION = "Multi-platform Ethernet communication suite for interfacing natively with Siemens S7 PLCs"
SECTION = "libsnap7"
LICENSE = "MIT"
LIC_FILES_CHKSUM = "file://${COMMON_LICENSE_DIR}/MIT;md5=0835ade698e0bcf8506ecda2f7b4f302"
PR = "r0"

SRC_URI = " \
    file://snap7.h \
    file://libsnap7.so.${PV} \
    file://libsnap7.pc \
    "

S = "${WORKDIR}"

TARGET_CC_ARCH += "${LDFLAGS}"

do_install() {
    install -d ${D}${libdir}
    oe_libinstall -C ${S} -so libsnap7 ${D}${libdir}

    install -d ${D}${libdir}/pkgconfig
    install -m 644 ${S}/libsnap7.pc ${D}${libdir}/pkgconfig/

    install -d ${D}${includedir}
    install -m 644 ${S}/snap7.h ${D}${includedir}
}

BBCLASSEXTEND = "native nativesdk"
