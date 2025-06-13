import { init } from '../serverless.js';

export const handler = init((() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["favicon.png","HALasm.js.mem","sounds/andar_direita.wav","sounds/andar_esquerda.wav","sounds/andar_frente.wav","sounds/andar_tras.wav","sounds/bloco_dancar.mp3","sounds/bloco_dancar_2.mp3","sounds/bloco_direita.mp3","sounds/bloco_direita_2.mp3","sounds/bloco_esquerda.mp3","sounds/bloco_esquerda_2.mp3","sounds/bloco_falar.mp3","sounds/bloco_falar_2.mp3","sounds/bloco_frente.mp3","sounds/bloco_frente_2.mp3","sounds/bloco_tras.mp3","sounds/bloco_tras_2.mp3","sounds/cartoon_wink.wav","sounds/dance_robot.wav","sounds/direita.wav","sounds/esquerda.wav","sounds/frente.wav","sounds/lucky.wav","sounds/not_here.wav","sounds/out_sound.wav","sounds/robot_speak.wav","sounds/sem_passagem.wav","sounds/tras.wav"]),
	mimeTypes: {".png":"image/png",".wav":"audio/wav",".mp3":"audio/mpeg"},
	_: {
		client: {"start":"_app/immutable/entry/start.zQUTqy-S.js","app":"_app/immutable/entry/app.DLFpGD5O.js","imports":["_app/immutable/entry/start.zQUTqy-S.js","_app/immutable/chunks/entry.pAc42aJY.js","_app/immutable/chunks/index-client.CSA-ezjU.js","_app/immutable/chunks/index.NMLMiy1k.js","_app/immutable/chunks/utils.BDFiQHwK.js","_app/immutable/entry/app.DLFpGD5O.js","_app/immutable/chunks/preload-helper.Bp0TTUf-.js","_app/immutable/chunks/index-client.CSA-ezjU.js","_app/immutable/chunks/utils.BDFiQHwK.js","_app/immutable/chunks/render.RrbG-2y8.js","_app/immutable/chunks/disclose-version.x_RuEKz0.js"],"stylesheets":[],"fonts":[],"uses_env_dynamic_public":false},
		nodes: [
			__memo(() => import('../server/nodes/0.js')),
			__memo(() => import('../server/nodes/1.js')),
			__memo(() => import('../server/nodes/2.js'))
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			}
		],
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})());
