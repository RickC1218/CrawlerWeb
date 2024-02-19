const { getData } = require("../components/crawl");

describe("getData", () => {
  test("Should return an array of data objects for valid HTML", () => {
    // Mock the input HTML string
    const html = `
    <html>
    <table>
    <tbody>
      <tr class="athing" id="1">
        <td class="title">
          <span class="rank">19.</span>
        </td>      
        <td class="title">
          <span class="titleline">
          <a href="https://https://github.com/RickC1218/WebCrawler">This proyect</a>
          </span>
        </td>
      </tr>
      <tr>
        <td class="subtext">
          <span class="subline">
            <span class="score" id="score_1">137 points</span> by <a href="user?id=herodotus" class="hnuser">herodotus</a> 
            <span class="age" title="2024-02-18T16:29:15">
              <a href="item?id=1">11 hours ago</a>
            </span> 
            <a href="item?id=1">39 comments</a>        
          </span>
        </td>
      </tr>
      </tbody>
    </table>
    </html>
    `;

    // Call the function
    const output = getData(html);

    // Assert the expected output structure
    expect(output).toEqual([
      {
        comments: "39 comments",
        id: "1",
        points: "137 points",
        rank: "19.",
        title: "This proyect",
      },
    ]);
  });

  test("Should return an empty array for non-HTML content", () => {
    // Mock the input HTML string
    const html = "<!-- this is not HTML -->";

    // Call the function
    const output = getData(html);

    // Assert the expected output structure
    expect(output).toEqual([]);
  });
});
