/**
 * 디스코드 알림. 실패해도 댓글 등록은 성공시켜야 하므로 절대 throw 하지 않는다.
 */
export async function notifyNewComment(input: {
  slug: string;
  nickname: string;
  body: string;
  isReply: boolean;
}): Promise<void> {
  const webhook = process.env.DISCORD_WEBHOOK_URL;
  if (!webhook) return;

  const label = input.isReply ? '답글' : '댓글';
  const content = [
    `**새 ${label}** · \`${input.slug}\``,
    `**${input.nickname}**: ${input.body.slice(0, 300)}`,
    `https://itssunny.day/posts`,
  ].join('\n');

  try {
    await fetch(webhook, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content, allowed_mentions: { parse: [] } }),
    });
  } catch {
    // 무시
  }
}
