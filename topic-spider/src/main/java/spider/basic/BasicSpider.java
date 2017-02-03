package spider.basic;

import spider.inter.SpiderInterface;
import pojo.news.NewsBean;
import pojo.news.TopicBean;
import okhttp3.*;
import org.apache.log4j.Logger;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;

import java.io.IOException;
import java.util.*;

/**
 * @Author chenxl
 * @Date 2016/12/26 20:55
 * @Describle
 */
public abstract class BasicSpider implements SpiderInterface{

    protected OkHttpClient okHttpClient;
    protected boolean isAuthor = false;
    protected Logger logger = Logger.getLogger(BasicSpider.class);



    protected Document getHtmlDocumentFromPost(String url , RequestBody requestBody){


        if(url == null || url.isEmpty()){

            return null;


        }else{

            Request request = new Request.Builder().url(url).post(requestBody).build();
            try {

                return Jsoup.parse(okHttpClient.newCall(request).execute().body().string());

            } catch (IOException e) {
                e.printStackTrace();
                return null;
            }

        }


    }


    protected Document getHtmlDocumentFromGet(String url){

        if(url == null || url.isEmpty()){

            return null;

        }else{

            Request request = new Request.Builder().url(url).get().build();
            try {

                Response execute = okHttpClient.newCall(request).execute();
                return Jsoup.parse(execute.body().string());

            } catch (IOException e) {
                e.printStackTrace();
                return null;
            }


        }


    }



    public BasicSpider() throws IOException {

        okHttpClient = new OkHttpClient.Builder().cookieJar(new LocalCookieJar()).build();
        authorClient(okHttpClient);

    }

    //CookieJar是用于保存Cookie的
    class LocalCookieJar implements CookieJar{
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

    protected abstract void authorClient(OkHttpClient okHttpClient);



    protected RequestBody buildRequestBody(Map<String,String> para){

        if(para == null)

            return null;

        else{


            FormBody.Builder builder = new FormBody.Builder();
            Set<Map.Entry<String, String>> entries = para.entrySet();
            for (Map.Entry<String, String> entry : entries) {

                builder.addEncoded(entry.getKey(),entry.getValue());

            }


            return builder.build();


        }


    }





    protected abstract List<TopicBean> getAllTopics();

    protected abstract List<NewsBean> getNewsByTopic(TopicBean topicBean);


    public Map<TopicBean,List<NewsBean>> getAllNews() {

        Map<TopicBean,List<NewsBean>> newsBeen = new HashMap<TopicBean, List<NewsBean>>();
        List<TopicBean> allTopics = getAllTopics();
        for (TopicBean allTopic : allTopics) {

            List<NewsBean> newsByTopic = getNewsByTopic(allTopic);
            if(newsByTopic!=null)

                newsBeen.put(allTopic,newsByTopic);

        }

        return newsBeen;
    }


}
