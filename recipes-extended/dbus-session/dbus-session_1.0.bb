DESCRIPTION = "DBus Session Bus"
SECTION = "dbus-session"
LICENSE = "MIT"
LIC_FILES_CHKSUM = "file://${COMMON_LICENSE_DIR}/MIT;md5=0835ade698e0bcf8506ecda2f7b4f302"
PR = "r0"

SRC_URI = "file://etc/profile.d/dbus-session.sh"

S = "${WORKDIR}"

do_install() {
    install -d ${D}${sysconfdir}/profile.d/
    install -m 755 ${S}${sysconfdir}/profile.d/dbus-session.sh ${D}${sysconfdir}/profile.d/
}
