package spider;

import spider.basic.BasicSpider;
import pojo.news.NewsBean;
import pojo.news.TopicBean;
import okhttp3.OkHttpClient;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Element;

import java.io.IOException;
import java.net.URL;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static java.util.stream.Collectors.toList;

/**
 * @Author chenxl
 * @Date 2017/1/9 18:33
 * @Describle
 */
public class Dytt8Spider extends BasicSpider {


    private static final String HOME_URL = "http://www.dytt8.net/index.html";

    private Map<String, String> topicListMap = new HashMap<String, String>();


    public Dytt8Spider() throws IOException {

        topicListMap.put("#header > div > div.bd2 > div.bd3 > div.bd3l > div:nth-child(1) > div.title_all > p"
                , "#header > div > div.bd2 > div.bd3 > div.bd3l > div:nth-child(1) > div.co_content2 > ul");
        topicListMap.put("#header > div > div.bd2 > div.bd3 > div:nth-child(2) > div.bd3rr > div:nth-child(2) > div.title_all > p"
                , "#header > div > div.bd2 > div.bd3 > div:nth-child(2) > div.bd3rr > div:nth-child(2) > div.co_content4 > ul");
        topicListMap.put("#header > div > div.bd2 > div.bd3 > div:nth-child(2) > div.bd3rr > div:nth-child(3) > div.title_all > p"
                , "#header > div > div.bd2 > div.bd3 > div:nth-child(2) > div.bd3rr > div:nth-child(3) > div.co_content4 > ul");
        topicListMap.put("#header > div > div.bd2 > div.bd3 > div:nth-child(2) > div.bd3rr > div:nth-child(4) > div.title_all > p"
                , "#header > div > div.bd2 > div.bd3 > div:nth-child(2) > div.bd3rr > div:nth-child(4) > div.co_content4 > ul");
        topicListMap.put("#header > div > div.bd2 > div.bd3 > div:nth-child(2) > div.bd3rr > div:nth-child(5) > div.title_all > p"
                , "#header > div > div.bd2 > div.bd3 > div:nth-child(2) > div.bd3rr > div:nth-child(5) > div.co_content4 > ul");
        topicListMap.put("#header > div > div.bd2 > div.bd3 > div:nth-child(2) > div.bd3rr > div:nth-child(6) > div.title_all > p"
                , "#header > div > div.bd2 > div.bd3 > div:nth-child(2) > div.bd3rr > div:nth-child(6) > div.co_content4 > ul");
        topicListMap.put("#header > div > div.bd2 > div.bd3 > div:nth-child(3) > div.bd3rr > div:nth-child(1) > div.title_all > p"
                , "#header > div > div.bd2 > div.bd3 > div:nth-child(3) > div.bd3rr > div:nth-child(1) > div.co_content4 > ul");
        topicListMap.put("#header > div > div.bd2 > div.bd3 > div:nth-child(3) > div.bd3rr > div:nth-child(2) > div.title_all > p"
                , "#header > div > div.bd2 > div.bd3 > div:nth-child(3) > div.bd3rr > div:nth-child(2) > div.co_content4 > ul");
        topicListMap.put("#header > div > div.bd2 > div.bd3 > div:nth-child(3) > div.bd3rr > div:nth-child(3) > div.title_all > p"
                , "#header > div > div.bd2 > div.bd3 > div:nth-child(3) > div.bd3rr > div:nth-child(3) > div.co_content4 > ul");

        topicListMap.put("#header > div > div.bd2 > div.bd3 > div:nth-child(2) > div:nth-child(1) > div > div:nth-child(2) > div.title_all > p > strong"
                , "#header > div > div.bd2 > div.bd3 > div:nth-child(2) > div:nth-child(1) > div > div:nth-child(2) > div.co_content8 > ul > table > tbody");
        topicListMap.put("#header > div > div.bd2 > div.bd3 > div:nth-child(2) > div:nth-child(1) > div > div:nth-child(3) > div.title_all > p > strong"
                , "#header > div > div.bd2 > div.bd3 > div:nth-child(2) > div:nth-child(1) > div > div:nth-child(3) > div.co_content8 > ul > table > tbody");
        topicListMap.put("#header > div > div.bd2 > div.bd3 > div:nth-child(2) > div:nth-child(1) > div > div:nth-child(4) > div.title_all > p > strong"
                , "#header > div > div.bd2 > div.bd3 > div:nth-child(2) > div:nth-child(1) > div > div:nth-child(4) > div.co_content3 > ul > table > tbody");
        topicListMap.put("#header > div > div.bd2 > div.bd3 > div:nth-child(2) > div:nth-child(1) > div > div:nth-child(5) > div.title_all > p > strong"
                , "#header > div > div.bd2 > div.bd3 > div:nth-child(2) > div:nth-child(1) > div > div:nth-child(5) > div.co_content3 > ul > table > tbody");
        topicListMap.put("#header > div > div.bd2 > div.bd3 > div:nth-child(2) > div:nth-child(1) > div > div:nth-child(6) > div.title_all > p > strong"
                , "#header > div > div.bd2 > div.bd3 > div:nth-child(2) > div:nth-child(1) > div > div:nth-child(6) > div.co_content3 > ul > table > tbody");
        topicListMap.put("#header > div > div.bd2 > div.bd3 > div:nth-child(3) > div:nth-child(1) > div > div:nth-child(1) > div.title_all > p > strong"
                , "#header > div > div.bd2 > div.bd3 > div:nth-child(3) > div:nth-child(1) > div > div:nth-child(1) > div.co_content3 > ul > table > tbody");
        topicListMap.put("#header > div > div.bd2 > div.bd3 > div:nth-child(3) > div:nth-child(1) > div > div:nth-child(2) > div.title_all > p > strong"
                , "#header > div > div.bd2 > div.bd3 > div:nth-child(3) > div:nth-child(1) > div > div:nth-child(2) > div.co_content8 > ul > table > tbody");
        topicListMap.put("#header > div > div.bd2 > div.bd3 > div:nth-child(3) > div:nth-child(1) > div > div:nth-child(3) > div.title_all > p > strong"
                , "#header > div > div.bd2 > div.bd3 > div:nth-child(3) > div:nth-child(1) > div > div:nth-child(3) > div.co_content8 > ul > table > tbody");


    }

    protected void authorClient(OkHttpClient okHttpClient) {


        logger.info("dytt8 needn't author");

    }

    /**
     * @return
     */
    protected List<TopicBean> getAllTopics() {

        List<TopicBean> topicBeanList = null;
        if (topicListMap != null)
            topicBeanList = topicListMap.keySet().stream().map(key -> {

                TopicBean topicBean = new TopicBean();
                topicBean.setUrlPath(key);
                Element p = null;
                try {

                    p = Jsoup.parse(new URL(HOME_URL), 2000).select(key).stream().findFirst().get();

                } catch (IOException e) {
                    e.printStackTrace();
                }

                if (p != null){

                    topicBean.setTopicTitle(p.text());
                    logger.info("获取站点：" + p.text());

                } else {

                    Element strong = Jsoup.parse(HOME_URL).getAllElements().select(key).stream().flatMap(element -> element.getElementsByTag("strong").stream()).findFirst().get();
                    if (strong != null){
                        topicBean.setTopicTitle(strong.text());
                        logger.info("获取站点：" + strong.text());

                    }

                }

                return topicBean;

            }).collect(toList());
        return topicBeanList;


    }

    protected List<NewsBean> getNewsByTopic(TopicBean topicBean) {

        String s = topicListMap.get(topicBean.getUrlPath());
        List<NewsBean> newsBeanList = null;
        newsBeanList = Jsoup.parse(HOME_URL).select(s).stream()
                .flatMap(element -> element.getElementsByTag("a").stream()).map(element -> {

                    NewsBean newsBean = new NewsBean();
                    newsBean.setTitle(element.data());
                    newsBean.setUrl(element.attr("href"));
                    return newsBean;

                }).collect(toList());


        return newsBeanList;
    }
}
