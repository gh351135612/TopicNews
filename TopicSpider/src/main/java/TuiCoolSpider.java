import basic.BasicSpider;
import news.NewsBean;
import news.TopicBean;
import okhttp3.*;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import util.PropertiesUtil;

import java.io.IOException;
import java.text.MessageFormat;
import java.util.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * @Author chenxl
 * @Date 2016/12/26 21:04
 * @Describle
 */
public class TuiCoolSpider extends BasicSpider{


    private static final String LOGIN_URL = "http://www.tuicool.com/login";
    private static final String TOPIC_URL = "http://www.tuicool.com/sites";
    private static final String HOT_SITES_URL="http://www.tuicool.com/sites/hotsites?id={0}&lang={1}";
    private static final String NEWS_PREFIX="http://www.tuicool.com/sites/{0}";
    private static final String PROPERTIES_PATH="tuicool_auth.properties";


    public TuiCoolSpider() throws IOException {


    }

    protected void authorClient(OkHttpClient okHttpClient) {


        try {


            PropertiesUtil propertiesUtil = new PropertiesUtil(PROPERTIES_PATH);
            Map<String, String> propertiesMap = propertiesUtil.getPropertiesMap();
            RequestBody requestBody = buildRequestBody(propertiesMap);
            Request build = new Request.Builder().post(requestBody).url(LOGIN_URL).build();
            Call call = okHttpClient.newCall(build);
            Response response = call.execute();
            String string = response.body().string();
            Document parse = Jsoup.parse(string);
            String title = parse.title();
            if(title.equals("推荐文章 - 推酷")){

                isAuthor = true;
                logger.info("TuiCoolSpider" + "验证成功");

            }



        } catch (IOException e) {
            e.printStackTrace();

        }


    }



    protected List<TopicBean> getAllTopics() {


        List<TopicBean> result = new ArrayList<TopicBean>();
        if(isAuthor){

            Map<String, String[]> allSitesIndex = getAllSitesIndex();

            if(allSitesIndex != null && allSitesIndex.size() != 0){

                Set<Map.Entry<String, String[]>> entries = allSitesIndex.entrySet();
                for (Map.Entry<String, String[]> entry : entries) {
                    logger.info("获取" + entry.getKey() + "站点的链接");
                    String[] value = entry.getValue();
                    if(value!=null&&value.length == 2){

                        List<TopicBean> topicBySite = getTopicBySite(value[0], value[1]);
                        result.addAll(topicBySite);


                    }


                }


            }

        }


        return result;
    }


    private Map<String,String[]> getAllSitesIndex(){

        Map<String,String[]> result = new HashMap<String,String[]>();
        Request build = new Request.Builder().url(TOPIC_URL).get().build();
        Call call = okHttpClient.newCall(build);
        try {

            Response execute = call.execute();
            String string = execute.body().string();
            Document parse = Jsoup.parse(string);
            Elements uls = parse.select("#hot-site-part > ul");
            Elements as = uls.select("li > a");
            /**
             *
             * <a href="javascript:loadsites(1,0,-1);"> <img src="http://ttimg1.tuicool.com/1.png!small" />新新推荐 </a>
             *
             */
            for (Element a : as) {


                //站点
                String hs = a.attr("href");;
                String pattern = "(\\-)*[0-9]+";
                Pattern p = Pattern.compile(pattern);
                Matcher matcher = p.matcher(hs);
                List<String> para = new ArrayList<String>();
                while (matcher.find()){

                    para.add(matcher.group());

                }

                if(para.size() == 3){

                    String[] s = {para.get(0),para.get(2)};
                    result.put(hs,s);

                }


            }



        } catch (IOException e) {
            e.printStackTrace();
        }finally {
            return result;
        }



    }


    private List<TopicBean> getTopicBySite(String p1 , String p2){

        List<TopicBean> result = new ArrayList<TopicBean>();
        if(p1!=null && p2!=null){

            String url = MessageFormat.format(HOT_SITES_URL, p1, p2);
            Request request = new Request.Builder().url(url).get().build();
            Call call = okHttpClient.newCall(request);
            try {

                Response execute = call.execute();
                String string = execute.body().string();
                result.addAll(getTopicsFromJson(string));


            } catch (IOException e) {
                e.printStackTrace();
            }



        }

        return result;


    }


    private TopicBean getTopicFromJsonObject(JSONObject jsonObject){

        TopicBean topicBean = new TopicBean();
        if(jsonObject!=null){

            try {
                if(jsonObject.has("name")){

                    topicBean.setTopicTitle(jsonObject.getString("name"));

                }

                if(jsonObject.has("id")){


                    topicBean.setUrlPath(jsonObject.getString("id"));
                }

            } catch (JSONException e) {
                e.printStackTrace();
            }

        }

        return topicBean;



    }


    private List<TopicBean> getTopicsFromJson(String json){

        List<TopicBean> result = new ArrayList<TopicBean>();
        if(json!=null){

            try {

                JSONObject jsonObject = new JSONObject(json);
                if(jsonObject.has("ch_data")){

                    JSONArray ch_data = jsonObject.getJSONArray("ch_data");
                    for (int i = 0; i < ch_data.length(); i++) {

                        JSONObject jo = ch_data.getJSONObject(i);

                        result.add(getTopicFromJsonObject(jo));


                    }


                }else if(jsonObject.has("en_data")){


                    JSONArray en_data = jsonObject.getJSONArray("en_data");
                    for (int i = 0; i < en_data.length(); i++) {

                        JSONObject jo = en_data.getJSONObject(i);

                        result.add(getTopicFromJsonObject(jo));

                    }


                }


            } catch (JSONException e) {
                e.printStackTrace();
            }


        }

        return result;


    }





    protected List<NewsBean> getNewsByTopic(TopicBean topicBean) {

        List<NewsBean> result = new ArrayList<NewsBean>();
        if(topicBean!=null){


            String urlPath = topicBean.getUrlPath();
            String format = MessageFormat.format(NEWS_PREFIX, urlPath);
            Document htmlDocumentFromGet = getHtmlDocumentFromGet(format);
            if(htmlDocumentFromGet!=null){


                Elements select = htmlDocumentFromGet.select("body > div.container-fluid > div.row-fluid > div.span9.contant > div:nth-child(2) > div.list_article > ol");
                Elements select1 = select.select("li.left > div.unit");
                for (int i = 0; i < select1.size(); i++) {

                    NewsBean newsBean = new NewsBean();
                    Element element = select1.get(i);
                    //标题
                    Elements titleElement = element.select("div > div.span9 > h4 > a.title");
                    if(titleElement!=null && titleElement.size()>0){

                        Element element1 = titleElement.get(0);
                        String title = element1.data();
                        newsBean.setTitle(title);


                    }

                    //摘要
                    Elements summaryElement = element.select("div > div.span9 > span.line-break");
                    if(summaryElement!=null && summaryElement.size()>0){


                        Element element1 = summaryElement.get(0);
                        String summary = element1.data();
                        newsBean.setSummary(summary);

                    }



                }


            }


        }
        return result;

    }
}
