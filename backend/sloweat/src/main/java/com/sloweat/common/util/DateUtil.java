package com.sloweat.common.util;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

/**
 *  UTIL 클래스 예시
 * */
public class DateUtil {

    public static String nowToString() {
        return LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
    }
}
