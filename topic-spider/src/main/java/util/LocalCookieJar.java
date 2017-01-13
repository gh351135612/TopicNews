package util;

import okhttp3.Cookie;
import okhttp3.CookieJar;
import okhttp3.HttpUrl;

import java.util.ArrayList;
import java.util.List;

/**
 * @Author chenxl
 * @Date 2016/12/26 21:11
 * @Describle
 */
public class LocalCookieJar implements CookieJar{
    List<Cookie> cookies;

    public List<Cookie> loadForRequest(HttpUrl arg0) {
        if (cookies != null)
            return cookies;
        return new ArrayList<Cookie>();
    }

    public void saveFromResponse(HttpUrl arg0, List<Cookie> cookies) {
        this.cookies = cookies;
    }

}
