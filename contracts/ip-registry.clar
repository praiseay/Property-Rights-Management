;; IP Registry Contract

(define-map ip-registry
  { content-hash: (buff 32) }
  {
    owner: principal,
    ip-type: (string-ascii 20),
    registration-date: uint,
    ip-nft-id: uint
  }
)

(define-constant err-already-registered (err u300))
(define-constant err-not-registered (err u301))

(define-public (register-ip (content-hash (buff 32)) (ip-type (string-ascii 20)) (ip-nft-id uint))
  (let
    (
      (existing-registration (map-get? ip-registry { content-hash: content-hash }))
    )
    (asserts! (is-none existing-registration) err-already-registered)
    (ok (map-set ip-registry
      { content-hash: content-hash }
      {
        owner: tx-sender,
        ip-type: ip-type,
        registration-date: block-height,
        ip-nft-id: ip-nft-id
      }
    ))
  )
)

(define-read-only (get-ip-info (content-hash (buff 32)))
  (ok (unwrap! (map-get? ip-registry { content-hash: content-hash }) err-not-registered))
)

(define-public (update-ip-owner (content-hash (buff 32)) (new-owner principal))
  (let
    (
      (ip-info (unwrap! (map-get? ip-registry { content-hash: content-hash }) err-not-registered))
    )
    (asserts! (is-eq tx-sender (get owner ip-info)) err-not-registered)
    (ok (map-set ip-registry
      { content-hash: content-hash }
      (merge ip-info { owner: new-owner })
    ))
  )
)

