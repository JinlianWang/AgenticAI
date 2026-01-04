# 运行方法

1. **安装 Python 3.12+**：确认 `python3 --version` 输出的是 3.12 或更高版本。
2. **创建虚拟环境**：在项目根目录执行：
   ```bash
   python3 -m venv .venv
   source .venv/bin/activate
   ```
3. **安装依赖**：在激活的虚拟环境中运行：
   ```bash
   python -m pip install --upgrade pip
   python -m pip install -e .
   ```
   （或直接 `python -m pip install click openai python-dotenv`）
4. **配置 API Key**：在项目根目录创建 `.env` 文件，写入：
   ```
   OPENAI_API_KEY=你的OpenAIKey
   # 可选：自定义模型（默认 gpt-4.1-mini）
   # OPENAI_MODEL=gpt-4.1-mini
   ```
   你可以在 https://platform.openai.com/ 的 API Keys 页面创建这个 key。
5. **运行项目**：保持虚拟环境激活状态，执行：
   ```bash
   python agent.py snake
   ```
   根据提示输入任务，例如：
   > 写一个贪吃蛇游戏，使用 HTML、CSS、JavaScript，分别写入 snake/index.html、snake/style.css、snake/script.js，并确保能直接在浏览器里运行
