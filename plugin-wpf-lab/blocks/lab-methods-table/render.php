<?php
/**
 * Render template for wpf/lab-methods-table.
 *
 * @var array $attributes Block attributes.
 */
if ( ! defined( 'ABSPATH' ) ) { exit; }

$eyebrow      = isset( $attributes['eyebrow'] )      ? $attributes['eyebrow']      : '';
$title_p1     = isset( $attributes['titlePart1'] )   ? $attributes['titlePart1']   : '';
$title_violet = isset( $attributes['titleViolet'] )  ? $attributes['titleViolet']  : '';
$title_p2     = isset( $attributes['titlePart2'] )   ? $attributes['titlePart2']   : '';
$title_acid   = isset( $attributes['titleAcid'] )    ? $attributes['titleAcid']    : '';
$featured     = isset( $attributes['featuredRow'] )  ? intval( $attributes['featuredRow'] ) : 7;

// Contenu figé — 7 méthodes (lab-WPF 2026.05).
$methods = array(
    array( 'n' => '01', 'name' => 'gutenberg natif',                       'tag' => 'Builder par défaut',  'blurb' => 'Pur Gutenberg, 0 plugin tiers, 0 CSS. Le baseline WordPress.',                       'verdict' => '« Maximum éditable, minimum visuel. »',                'scores' => array( 5.0, 2.0, 5.0, 4.0 ), 'total' => 4.0, 'url' => '/accueil-gutenberg-natif/' ),
    array( 'n' => '02', 'name' => 'gutenberg + css personnalisé',         'tag' => '★ LA HISTORIQUE',     'blurb' => "L'approche historique : structure native, finition CSS par page-level Spectra.", 'verdict' => '« Le sweet spot Spectra. »',                          'scores' => array( 5.0, 5.0, 4.0, 5.0 ), 'total' => 4.75, 'url' => '/methode-wpformation/' ),
    array( 'n' => '03', 'name' => 'html monobloc',                        'tag' => 'Bloc HTML brut',      'blurb' => "Une seule grosse iframe d'HTML/CSS collée dans un bloc Custom HTML.",                'verdict' => '« Beau, mais inéditable. Risqué pour le client. »',     'scores' => array( 1.0, 5.0, 5.0, 2.0 ), 'total' => 3.25, 'url' => '/methode-html-monobloc/' ),
    array( 'n' => '04', 'name' => 'html multi-blocs',                     'tag' => 'Custom HTML × 10',    'blurb' => 'Dix blocs HTML, un par section. Éditable section-par-section.',                       'verdict' => '« Mieux que le monobloc, plus lourd à reprendre. »',    'scores' => array( 3.0, 5.0, 5.0, 3.0 ), 'total' => 4.0, 'url' => '/methode-html-multiblocs/' ),
    array( 'n' => '05', 'name' => 'spectra pro',                          'tag' => 'Builder tiers',       'blurb' => 'Full Site Editing avec Spectra Pro, blocs natifs + configuration UI.',               'verdict' => '« Rapide, mais dépendant d\'un plugin payant. »',       'scores' => array( 4.0, 4.0, 2.0, 4.0 ), 'total' => 3.5,  'url' => '/methode-spectra-pro/' ),
    array( 'n' => '06', 'name' => 'gutenberg pur + core/html',            'tag' => '100% NATIF',          'blurb' => 'Blocs Gutenberg core + 1 seul bloc core/html avec <style>. Zéro plugin.',           'verdict' => '« Le natif tient debout, scriptable et autonome. »',    'scores' => array( 5.0, 5.0, 5.0, 5.0 ), 'total' => 5.0,  'url' => '/methode-gutenberg-pur/' ),
    array( 'n' => '07', 'name' => 'blocs php custom',                     'tag' => '★ LA NOUVELLE',       'blurb' => 'Plugin custom + blocs PHP WP 7.0 autoRegister. Design figé, édition lockée.', 'verdict' => '« Design verrouillé, édition non-destructive. »',      'scores' => array( 5.0, 5.0, 5.0, 5.0 ), 'total' => 5.0,  'url' => '/methode-blocs-php-custom/' ),
);

$wrapper_attrs = get_block_wrapper_attributes( array(
    'class' => 'wpf-lab-methods alignfull',
) );
?>
<section <?php echo $wrapper_attrs; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>>
    <div class="wpf-lab-methods__head">
        <p class="wpf-lab-methods__eyebrow"><?php echo esc_html( $eyebrow ); ?></p>
        <h2 class="wpf-lab-methods__title">
            <?php echo esc_html( $title_p1 ); ?>
            <br>
            <span class="wpf-lab-methods__op-violet"><?php echo esc_html( $title_violet ); ?></span>
            <?php echo esc_html( $title_p2 ); ?>
            <span class="wpf-lab-methods__hl"><?php echo esc_html( $title_acid ); ?></span>.
        </h2>
    </div>
    <div class="wpf-lab-methods__table">
        <div class="wpf-lab-methods__head-row">
            <div></div>
            <div>MÉTHODE</div>
            <div>ÉDITABILITÉ</div>
            <div>DESIGN</div>
            <div>INDÉPENDANCE</div>
            <div>REPRODUCT.</div>
            <div>TOTAL</div>
        </div>
        <?php foreach ( $methods as $i => $m ) :
            $is_featured = ( ( $i + 1 ) === $featured );
            $row_class   = 'wpf-lab-methods__row';
            if ( $is_featured ) { $row_class .= ' wpf-lab-methods__row--featured'; }
        ?>
            <div class="<?php echo esc_attr( $row_class ); ?>">
                <p class="wpf-lab-methods__n"><?php echo esc_html( $m['n'] ); ?></p>
                <div class="wpf-lab-methods__meta">
                    <div class="wpf-lab-methods__name-row">
                        <p class="wpf-lab-methods__name"><?php echo esc_html( $m['name'] ); ?></p>
                        <?php if ( $is_featured ) : ?><p class="wpf-lab-methods__pill">★ RETENUE</p><?php endif; ?>
                    </div>
                    <p class="wpf-lab-methods__tag"><?php echo esc_html( $m['tag'] ); ?></p>
                    <p class="wpf-lab-methods__blurb"><?php echo esc_html( $m['blurb'] ); ?></p>
                    <p class="wpf-lab-methods__verdict"><?php echo esc_html( $m['verdict'] ); ?></p>
                </div>
                <?php foreach ( $m['scores'] as $score ) :
                    $pct = intval( $score * 20 ); ?>
                    <div class="wpf-lab-methods__score">
                        <div class="wpf-lab-methods__score-num-row">
                            <p class="wpf-lab-methods__score-num"><?php echo esc_html( number_format( $score, 1 ) ); ?></p>
                            <p class="wpf-lab-methods__score-max">/5</p>
                        </div>
                        <div class="wpf-lab-methods__bar"><div class="wpf-lab-methods__bar-fill" style="width:<?php echo esc_attr( $pct ); ?>%"></div></div>
                    </div>
                <?php endforeach; ?>
                <div class="wpf-lab-methods__total">
                    <p class="wpf-lab-methods__total-num"><?php echo esc_html( number_format( $m['total'], 1 ) ); ?></p>
                    <p class="wpf-lab-methods__total-label">moyenne</p>
                    <a class="wpf-lab-methods__cta" href="<?php echo esc_url( $m['url'] ); ?>">voir ↗︎</a>
                </div>
            </div>
        <?php endforeach; ?>
    </div>
    <div class="wpf-lab-methods__footer">
        <p>↳ MOYENNES NON PONDÉRÉES · CALCULÉES SUR LES 4 PILIERS · LAB-WPF-2026-05</p>
        <p>SOURCE · DATASET ↗︎</p>
    </div>
</section>
