/*
 * @Description: vue全局过滤器模块
 * @Version: 1.0.0
 * mikahuang
 */


// 过滤器dayjs
import dayjs from 'dayjs'


/*
 * 一年前展示年月日,一年内展示月日
 * params string str
 * params string fmt
 */
export const fixDate = (str,fmt = 'YYYY.MM.DD') => {
	const year = dayjs(new Date()).year();
	const pyear = dayjs(str).year()
    //一年前
	if(year > pyear){
		return dayjs(str).format(fmt)
	} else {
		return dayjs(str).format('MM.DD')
	}
}

/*
 * 格式化时间
 * params string str
 * params string fmt
 */
export const formatTime = (str,fmt = 'YYYY-MM-DD') => {
	return dayjs(str).format(fmt)
}



export const getDateDiff = function(str){
  if(!str){
    return "";
  }
  let dDate = dayjs(str);
  if(!dDate || !dDate.$d){
    return "";
  }
  let result = "";
	let minute = 1000 * 60;
	let hour = minute * 60;
	let day = hour * 24;
	let halfamonth = day * 15;
	let month = day * 30;
	let now = new Date().getTime();
	let diffValue = now - dDate.$d.getTime();
	if(diffValue < 0){
     return "刚刚";
  }
	let monthC =diffValue/month;
	let weekC =diffValue/(7*day);
	let dayC =diffValue/day;
	let hourC =diffValue/hour;
	let minC =diffValue/minute;
	if(monthC>=1){
		//result="" + Math.floor(monthC) + "月前";
    result = dDate.format('YYYY-MM-DD');
	}
	else if(weekC>=1){
		result="" + Math.floor(weekC) + "周前";
	}
	else if(dayC>=1){
    if(Math.floor(dayC) == 1){
      result="昨天 " + dDate.format('HH:mm');
    }
    else if(Math.floor(dayC) == 2){
      result="前天";
    }
    else{
      result=""+ Math.floor(dayC) +"天前";
    }
	}
	else if(hourC>=1){
		result=""+ Math.floor(hourC) +"小时前";
	}
	else if(minC>=1){
		result=""+ Math.floor(minC) +"分钟前";
	}
  else{
    result="刚刚";
  }
	return result;
}


export const formatNumber_W = function(num){
  let result = "0";
  num = Number(num);
  if(!num){
    return result;
  }
  if(num>=100000000){
    result = (num/100000000).toFixed(1) + '亿';
  }
	else if(num>=10000){
    result = (num/10000).toFixed(1) + 'w';
	}
  else{
    result = num + "";
  }
	return result;
}

