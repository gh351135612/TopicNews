package util;

import com.google.common.collect.ImmutableMap;
import com.google.common.collect.Maps;

import java.io.IOException;
import java.io.InputStream;
import java.util.Map;
import java.util.Properties;

/**
 * @Author chenxl
 * @Date 2016/12/26 21:16
 * @Describle
 */
public class PropertiesUtil {

    private Properties properties = new Properties();


    public PropertiesUtil(String path) throws IOException {


        InputStream resourceAsStream = Thread.currentThread().getContextClassLoader().getResourceAsStream(path);
        properties.load(resourceAsStream);
        resourceAsStream.close();


    }

    public Map<String,String> getPropertiesMap(){

        return Maps.fromProperties(properties);

    }

    public String getValueByKey(String key){

        ImmutableMap<String, String> stringStringImmutableMap = Maps.fromProperties(properties);

        return stringStringImmutableMap.get(key);


    }



}
