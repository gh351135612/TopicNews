package inter;

import bean.NewsBean;
import bean.TopicBean;

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
