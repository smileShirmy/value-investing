import fs from "fs";
import path from "path";
import type { StockData } from "./types";

/**
 * 加载/data目录下的所有JSON文件
 * @returns 包含所有股票数据的数组
 */
export async function loadAllStockData(): Promise<
  Array<{ code: string; data: StockData }>
> {
  const dataDir = path.resolve(__dirname, "../data");

  try {
    // 读取data目录下的所有文件
    const files = fs.readdirSync(dataDir);

    // 过滤出JSON文件
    const jsonFiles = files.filter((file) => file.endsWith(".json"));

    // 动态导入所有JSON文件
    const stockDataArray = await Promise.all(
      jsonFiles.map(async (file) => {
        const stockCode = path.basename(file, ".json");
        try {
          // 动态导入JSON文件
          const stockData = await import(`../data/${file}`);
          return {
            code: stockCode,
            data: stockData.default || stockData,
          };
        } catch (error) {
          console.error(`Error loading data for stock ${stockCode}:`, error);
          return null;
        }
      })
    );

    // 过滤掉加载失败的数据
    return stockDataArray.filter((item) => item !== null) as Array<{
      code: string;
      data: StockData;
    }>;
  } catch (error) {
    console.error("Error loading stock data:", error);
    return [];
  }
}

// /**
//  * 示例用法
//  */
// async function example() {
//   const allStockData = await loadAllStockData();
//   console.log(`成功加载了 ${allStockData.length} 个股票的数据`);

//   // 可以通过股票代码访问特定的数据
//   allStockData.forEach(stock => {
//     console.log(`股票代码: ${stock.code}`);
//     // 处理每个股票的数据...
//   });
// }

// // 如果直接运行此文件，则执行示例
// if (require.main === module) {
//   example().catch(console.error);
// }
