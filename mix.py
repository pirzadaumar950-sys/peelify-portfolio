import json,sys,numpy as np,soundfile as sf
from scipy.signal import resample_poly
K='/home/claude/sfxsrc/sfx-kit/';S_=json.load(open(K+'sounds.json'))['sounds'];meta=S_ if isinstance(S_,dict) and 'whoosh-fast-hard' in S_ else {x['id']:x for x in (S_.values() if isinstance(S_,dict) else S_)}
cues=json.load(open('cues.json'));dur=float(sys.argv[1]);SR=48000
out=np.zeros((int(dur*SR)+SR,2))
cache={}
for c in cues:
  m=meta[c['id']]
  if c['id'] not in cache:
    x,sr=sf.read(K+m['file'],always_2d=True)
    if x.shape[1]==1:x=np.repeat(x,2,1)
    if sr!=SR:x=resample_poly(x,SR,sr,axis=0)
    cache[c['id']]=x
  x=cache[c['id']];st=int((c['t']-m['sync']['at'])*SR)
  if st<0:x=x[-st:];st=0
  e=min(len(out),st+len(x));out[st:e]+=x[:e-st]*c['g']
out=out[:int(dur*SR)]
pk=np.max(np.abs(out));print('peak',pk)
sf.write('sfx_raw.wav',out,SR)
