package spider.inter;


import pojo.news.NewsBean;
import pojo.news.TopicBean;

import java.util.List;
import java.util.Map;

/**
 * @Author chenxl
 * @Date 2016/12/26 20:57
 * @Describle
 */
public interface SpiderInterface {

    public Map<TopicBean,List<NewsBean>> getAllNews();


}
