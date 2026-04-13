import React, { useState, useEffect } from "react";

interface ProjectItem {
  name: string;
  description: string;
  url: string;
  date: string;
}

const Projects: React.FC = () => {
  const [items, setItems] = useState<ProjectItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [reposRes, prsRes] = await Promise.all([
          fetch("https://api.github.com/users/xinyun2020/repos?type=owner&sort=updated&per_page=100"),
          fetch("https://api.github.com/search/issues?q=author:xinyun2020+type:pr+is:public+-user:xinyun2020&sort=created&order=desc&per_page=20"),
        ]);
        const reposData = await reposRes.json();
        const prsData = await prsRes.json();

        const repos: ProjectItem[] = (Array.isArray(reposData) ? reposData : [])
          .filter((r: any) => !r.fork && !r.private && r.name !== "nextra-docs" && r.name !== "xinyun2020")
          .map((r: any) => ({
            name: r.name,
            description: r.description || "No description",
            url: r.html_url,
            date: r.updated_at?.slice(0, 10) || "",
          }));

        const prs: ProjectItem[] = (prsData.items || [])
          .filter((p: any) => p.state === "open" || p.pull_request?.merged_at)
          .map((p: any) => {
          const urlParts = p.repository_url.split("/");
          return {
            name: `PR: ${urlParts[urlParts.length - 1]}`,
            description: p.title,
            url: p.html_url,
            date: p.created_at?.slice(0, 10) || "",
          };
        });

        setItems([...repos, ...prs].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 3));
      } catch {
        setItems([]);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  if (loading) return <div className="text-xs text-gray-400 py-2">Loading...</div>;
  if (items.length === 0) return null;

  return (
    <div className="text-left w-full">
      <table className="w-full text-xs">
        <thead>
          <tr className="border-b border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400">
            <th className="py-1.5 pr-3 font-medium text-left">Recently working on</th>
            <th className="py-1.5 pr-3 font-medium text-left hidden sm:table-cell">Description</th>
            <th className="py-1.5 font-medium text-right">Date</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, i) => (
            <tr key={i} className="border-b border-gray-100 dark:border-gray-800">
              <td className="py-2 pr-3">
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#0AAFCE] hover:underline focus-visible:ring-2 focus-visible:ring-[#0AAFCE]"
                >
                  {item.name}
                </a>
              </td>
              <td className="py-2 pr-3 text-gray-500 dark:text-gray-400 hidden sm:table-cell truncate max-w-[200px]">
                {item.description}
              </td>
              <td className="py-2 text-right text-gray-500 dark:text-gray-400 whitespace-nowrap">
                {item.date}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <a
        href="https://github.com/xinyun2020"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-2 inline-block text-xs text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 underline underline-offset-2 transition-colors focus-visible:ring-2 focus-visible:ring-[#0AAFCE]"
      >
        Show all on GitHub
      </a>
    </div>
  );
};

export default Projects;
