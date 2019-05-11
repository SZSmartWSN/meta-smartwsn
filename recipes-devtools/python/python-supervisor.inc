SUMMARY = "Supervisor is a client/server system that allows its users to control a number of processes on UNIX-like operating systems."
HOMEPAGE = "http://supervisord.org/"
SECTION = "devel/python"
LICENSE = "BSD"
LIC_FILES_CHKSUM = "file://LICENSES.txt;md5=5b4e3a2172bba4c47cded5885e7e507e"

SRCNAME = "supervisor"

inherit pypi

SRC_URI[md5sum] = "ac70dadd051dcaf1d03c467d51a3aac1"
SRC_URI[sha256sum] = "5604457da4fb89d850e78c128205fe4938c9277f87301885b33c94c60361e575"

RDEPENDS_${PN} = "${PYTHON_PN}-meld3 "
