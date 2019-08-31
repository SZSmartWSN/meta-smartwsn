#!/bin/bash
#
# Author: Clive Lau <ftdstudio1990@gmail.com>
#
# Auto setup the default route rule

##############################################

# Version Type, 0 - Debug, 1 - Release
VERSION_TYPE=1

IFACE_NAME_WAN='eth0'
IFACE_NAME_WIFI='wlan0'

##############################################

# @brief: 输出log信息, debug level
function LOGD()
{
  if test ${VERSION_TYPE} -eq 0
  then
    echo $1 > /dev/stdout
  else
    echo $1 > /dev/null
  fi
}

# @brief: 获取IFACE连接状态
#
# @return: 0 (无连接)
#          1 (仅有WAN连接)
#          2 (仅有WiFi连接)
#          3 (WAN + WiFi连接)
function getIfaceConnStatus()
{
  local flag
  local retval

  retval=0

  # 获取WAN当前状态, 0 - 未连接, 1 - 已连接
  flag=`cat /sys/class/net/${IFACE_NAME_WAN}/carrier`
  if test ${flag} -eq 1
  then
    retval=`expr ${retval} + 1`
  fi

  # 获取WiFi当前状态, 0 - 未连接, 1 - 已连接
  flag=`cat /sys/class/net/${IFACE_NAME_WIFI}/carrier`
  if test ${flag} -eq 1
  then
    retval=`expr ${retval} + 2`
  fi

  return ${retval}
}

# @brief: 判断是否已设置默认路由
#
# @iface: 输入IFACE name
#
# @return: 0 (没有设置)
#         >0 (已经设置)
function isSetupDefaultRoute()
{
  local flag
  local iface

  iface=$1

  flag=`ip route | grep default | grep ${iface} | wc -l`

  LOGD "<isSetupDefaultRoute>: iface(${iface}), flag(${flag})"

  return ${flag}
}

# @brief: 设置默认路由优先级
function setDefaultRouteMetric()
{
  local iface
  local isExisted
  local expected
  local metric
  local gateway

  iface=$1
  isExisted=0
  expected=$2

  LOGD "<setDefaultRouteMetric>: called, iface(${iface}), expected(${expected})"

  # 获取默认路由的Metic值
  #metric=(`ip route | grep default | grep ${iface} | awk '{print $9}'`)
  metric=(`route -n | grep ${iface} | grep UG | awk '{print $5}'`)
  LOGD "<setDefaultRouteMetric>: metric count(${#metric[*]})"
  for val in ${metric[*]}
  do
    LOGD "<setDefaultRouteMetric>: val(${val}), expected(${expected})"
    if test ${val} -eq ${expected}
    then
      isExisted=1
      break
    fi
  done

  if test ${isExisted} -ne 1
  then
    LOGD "<setDefaultRouteMetric>: metric isn't equal to expected"
    # TODO: 是否需要将metric!=0的路由规则删除？
    # 获取默认路由的Gateway值
    gateway=(`ip route | grep default | grep ${iface} | awk '{print $3}'`)
    # 增加默认路由规则，并设置为最高优先级(metric: 0)
    #route add default gw ${gateway} dev ${iface} metric ${expected}
    ip route replace default via ${gateway[0]} dev ${iface}  proto static  metric ${expected}
  else
    LOGD "<setDefaultRouteMetric>: metric is equal to expected"
  fi

  return 0
}


##############################################


while true
do
  getIfaceConnStatus
  case $? in
    # 连接WAN
    1)
      LOGD "WAN"
      isSetupDefaultRoute ${IFACE_NAME_WAN}
      if test $? -ne 0
      then
        setDefaultRouteMetric ${IFACE_NAME_WAN} 0
      else
        LOGD "WAN: default route isn't exist"
      fi
      ;;

    # 连接WiFi
    2)
      LOGD "WIFI"
      isSetupDefaultRoute ${IFACE_NAME_WIFI}
      if test $? -ne 0
      then
        setDefaultRouteMetric ${IFACE_NAME_WIFI} 0
      else
        LOGD "WiFi: default route isn't exist"
      fi
      ;;

    # 连接WAN + WiFi
    3)
      LOGD "WAN+WIFI"
      isSetupDefaultRoute ${IFACE_NAME_WAN}
      if test $? -ne 0
      then
        setDefaultRouteMetric ${IFACE_NAME_WAN} 0
      else
        LOGD "WAN+WIFI: WAN default route isn't exist"
      fi

      isSetupDefaultRoute ${IFACE_NAME_WIFI}
      if test $? -ne 0
      then
        setDefaultRouteMetric ${IFACE_NAME_WIFI} 1024
      else
        LOGD "WAN+WiFi: WIFI default route isn't exist"
      fi
      ;;

    *)
      ;;
  esac

  sleep 5
done
