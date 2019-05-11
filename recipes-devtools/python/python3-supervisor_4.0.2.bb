inherit setuptools3
require python-supervisor.inc

SRC_URI += " file://supervisord.conf"

do_install_append() {
    install -d ${D}${sysconfdir}/supervisor/
    install -d ${D}${sysconfdir}/supervisor/conf.d/
    install -d ${D}${localstatedir}/log/supervisor/
    install -m 0755 ${WORKDIR}/supervisord.conf ${D}${sysconfdir}/supervisor/
}

