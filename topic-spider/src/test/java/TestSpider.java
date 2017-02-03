import spider.basic.BasicSpider;
import pojo.news.NewsBean;
import pojo.news.TopicBean;
import spider.Dytt8Spider;

import java.io.IOException;
import java.util.List;
import java.util.Map;

/**
 * @Author chenxl
 * @Date 2017/1/17 13:54
 * @Describle
 */
public class TestSpider {

    public static void main(String[] args) throws IOException {


        BasicSpider basicSpider = new Dytt8Spider();
        Map<TopicBean, List<NewsBean>> allNews = basicSpider.getAllNews();
        System.out.println(allNews.size());


    }


}
